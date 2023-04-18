import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'angular-highcharts';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component2.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  
  year=2022
  modalRef: BsModalRef;
    user: any = {};
    itemToSearch: any = {};
    busyGet: Subscription
    data = [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    highchart: any
    items: any;
    bsRangeValue: Date[];
    minDate = new Date();
    maxDate = new Date();
    currentDate = new Date();
    totalSecteurs = 0
    totalControleurs = 0
    totalHospit: any;
    itemsSecteur: any;
    userImg:any
    colors = ['#236CB7', '#644033', '#A08377', '#C3BEB7', '#9F7417', '#644033', '#F7B400', '#A08377', '#C3BEB7', '#9F7417', '#644033', '#F7B400', '#A08377', '#C3BEB7', '#9F7417', '#644033', '#F7B400', '#A08377', '#C3BEB7', '#9F7417', '#644033', '#F7B400', '#A08377', '#C3BEB7', '#9F7417'];


      constructor(private httpClient:HttpClient,private authService: AuthService, private restClient: RestClientService, private modalService: BsModalService, private utilities: UtilitiesService) {
        this.user = 1
        // this.maxDate.setDate(this.currentDate.getDate()+30);
        // this.minDate.setDate(this.currentDate.getDate()-30);
        let now = new Date();
        let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        this.minDate = firstDay
        this.maxDate = lastDay





        
    }

  ngOnInit() {
    this.getVistesByMonth()
    
  }

  




  getVistesByMonth() {
    let request = {
      data: {
        annee: this.year
      }
  }
    console.log('res: ', request);

    this.busyGet = this.restClient.post('tresoReglement/getMontantByYear', request).subscribe({
        next: (res: any) => {
            console.log('res here', res);

            if (res && res.items && !res.hasError) {
                this.items = res.items;
            }
            else {
                this.items = [];
                if (res.hasError) {
                    this.utilities.showNotification("snackbar-danger",
                        this.utilities.formatMsgServeur(res.status.message),
                        "top",
                        "right");
                    return
                }
            }
            this.drawBarChart(this.items)


        },
        error: (err) => {

            this.utilities.showNotification("snackbar-danger",
                this.utilities.formatMsgServeur(err),
                "top",
                "right");
        },
        complete: () => console.info('complete')
    })
}



drawBarChart(datas) {
  let itemToDraw = []
  let itemToDrawFull = []

  let categories = []
  console.log("datas: ",datas)

  datas.map(d => {
      itemToDraw.push(d.montant)
      // itemToDrawFull.push(d.valueFull)
      // categories.push(moment(d.key).format('MM/YY'))
      categories.push(d.moisLibelle)

  })
  console.log('to draw: ', itemToDraw);

  this.highchart = new Chart({
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      credits: {
          enabled: false
      },
      xAxis: {
          categories: categories,
          crosshair: true
      },
      plotOptions: {
          column: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      colors: this.colors,
      series: [

          {
              type: 'column',
              name: 'Montant',
              data: itemToDraw
          },
          // {
          //     type: 'column',
          //     name: 'Hospit',
          //     data: itemToDrawFull
          // },


      ]
  });
}




}
