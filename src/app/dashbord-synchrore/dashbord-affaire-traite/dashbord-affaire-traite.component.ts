import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/service/user.service";
import { BusinessOptionalService } from "../../core/service/business-optional.service";
import { Subscription } from "rxjs";
import { Exercice } from "../../core/models/exercice";
import { Cedante } from "../../core/models/cedante";
import { CedanteService } from "../../core/service/cedante.service";
import { ExerciceService } from "../../core/service/exercice.service";
var Highcharts = require("highcharts");
import * as _ from "lodash";
import { enumStatutAffaire } from "../../core/enumerator/enumerator";

@Component({
  selector: 'app-dashbord-affaire-traite',
  templateUrl: './dashbord-affaire-traite.component.html',
  styleUrls: ['./dashbord-affaire-traite.component.scss']
})
export class DashbordAffaireTraiteComponent implements OnInit {

  modalRef: BsModalRef;
  user: User;
  busyGet: Subscription;
  listeExercices: Array<Exercice> = [];
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  itemStatistique : any = {};

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private businessOptionalService: BusinessOptionalService,
    private cedenteService: CedanteService,
    private exercieService: ExerciceService
  ) {
    this.user = this.userService.getCurrentUserInfo();
  }

  getCedente() {
    this.cedenteService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeCedente = response["content"] as Cedante[];

        if(this.user.cedId) {
          this.itemToSearch.cedenteId = this.user.cedId;
        }

      } else {
        this.listeCedente = [];
      }
    });
  }

  getExercice() {
    this.exercieService.getAll().subscribe((response: any) => {
      if (response) {
        this.listeExercices = response as Exercice[];
        this.itemToSearch.exeCode = this.listeExercices[0].exeCode;
      } else {
        this.listeExercices = [];
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-65",
    };

    this.modalRef = this.modalService.show(template, config);
  }

  getStatistique() {

    this.busyGet = this.businessOptionalService
      .getAffaireForStatistique(0,10000,null,(this.itemToSearch.cedenteId || null),(this.itemToSearch.exeCode || null))
      .subscribe((response) => {
        console.log(" response statitstique ", response);

        if(response['content']) {
          this.itemStatistique.totalAffaires = response['content']?.length;

          let groupeResult = _.groupBy(response['content'], 'statutCode');

          _.map(groupeResult,(value,key) => {
            console.log(" key ",key);
            console.log(" value ",value);
            const nombre = value.length;

            if(key?.toLowerCase() === enumStatutAffaire.EN_COURS_PLACEMENT.toLowerCase()) {
              this.itemStatistique.totalEnCoursPlacement =  nombre;
            }

            if(key?.toLowerCase() === enumStatutAffaire.EN_REGLEMENT.toLowerCase()) {
              this.itemStatistique.totalEnCoursReglement =  nombre;
            }

            if(key?.toLowerCase() === enumStatutAffaire.ARCHIVE.toLowerCase()) {
              this.itemStatistique.totalArchive =  nombre;
            }

          })
        
          console.log(" groupeResult ",groupeResult);
          
        }
      });
  }

  getLineChartValue() {
    Highcharts.chart("line-chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "Statistique des affaires par mois",
      },
     
      xAxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Avr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Nombre d'affaire",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      colors: [
        '#3a99d7',
        '#f17e0b',
        '#5fc990' 
       ],
      series: [
        {
          name: "Toutes les affaires",
          data: [
            149.9, 171.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            195.6, 154.4,
          ],
        },
        {
          name: "Affaire en placement",
          data: [
            83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
            106.6, 92.3,
          ],
        },
        {
          name: "Affaires reglées",
          data: [
            42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
            51.1,
          ],
        },
      ],
    });
  }

  getPieChartValue() {
    Highcharts.chart("pie-chart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Repartition des affaires par statut",
        align: "center",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      colors: [
        '#f17e0b',
        '#ffd9a9',
        '#5fc990',
        '#797c83'
       ],
      series: [
        {
          name: "Statut",
          colorByPoint: true,
          data: [
            {
              name: "En cours placement",
              y: 70.67,
              sliced: true,
              selected: true,
            },
            {
              name: "En règlement",
              y: 4.86,
            },
            {
              name: "Reglée",
              y: 2.63,
            },
            {
              name: "Saisie",
              y: 1.53,
            }
            
          ],
        },
      ],
    });
  }

  ngOnInit(): void {
    this.getStatistique();
    this.getExercice();
    this.getCedente();
    // this.getPieChartValue();
    // this.getLineChartValue();
  }

}
