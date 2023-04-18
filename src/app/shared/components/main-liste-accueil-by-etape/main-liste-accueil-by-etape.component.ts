import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-main-liste-accueil-by-etape',
  templateUrl: './main-liste-accueil-by-etape.component.html',
  styleUrls: ['./main-liste-accueil-by-etape.component.scss']
})
export class MainListeAccueilByEtapeComponent implements OnInit {

   //Declaration de la variable d'emission des valeurs
  @Output() acceuilSelected = new EventEmitter<any>();
  @Input() refreshItem : any;
  @Input() title : any;
  @Input() isNeedBulletinCadre : boolean = false;
  @Input() hasNeedPlusColonne : any;
  @Input() hasNeedEtapeCircuit : any;
  @Input() hasNumeroDossier : any;
  @Input() etapeCircuit : any;
  @Input() etapeCircuit2 : any;
  @Input() praticienId : any;
  @Input() uniteFonctionnelleId : any;
  @Input() isCaisseView : boolean = false;
  @Input() isSeeHistoConsultation:any;
  @Input() isHistoriqueConsultation : boolean;
  @Input() patient : any;
  @Input() typeActeCode : any;
  @Input() noLogicCheck : any;
  @Input() isLaboEdition : any;
  @Input() adminUniteFonctionnelleCode : any;

  listeBulletins : Array<any> = [];
  listItems: Array<any> = [];
  items: Array<any> = [];
  user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number;
  busyGet: Subscription;
  loading: boolean = false;
  itemSelected : any = {};

  constructor(private authService: AuthService, private restClient: RestClientService, private modalService: BsModalService, private utilities: UtilitiesService) {
    this.user = this.authService.currentUserValue;
  }


  changePaginationSize($event) {
    if($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }
  
  
  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  seletedItem(accueil : any){
    if(accueil){
      this.itemSelected = accueil;
      this.acceuilSelected.emit(accueil);
    }
  }

  getDetailsBulletin(item) {

    var request = {
      user: this.user.id,
      data: {
        consultationId : item?.id
      }
    }
    
    this.busyGet = this.restClient.post('exCompBulletinActeExterne/getByCriteria', request)
      .subscribe(
        res => {
          console.log("resul apres generation", res);
          this.itemToSearch.isGenerate = true;

          if (!res['hasError']) {
            // this.utilities.showNotification("snackbar-success",
            //     this.utilities.formatMsgServeur(res['status']['message']),
            //     "bottom",
            //     "center");

            this.listeBulletins = res['items'];

          } else {
            if (res['status'] && res['status']['message']) {
              // this.utilities.showNotification("snackbar-danger",
              //   this.utilities.formatMsgServeur(res['status']['message']),
              //   "bottom",
              //   "center");
            }
          }
        },
        err => {
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
          this.loading = false;
        }
      );
  }
  

  genererNumDossier(item) {

    let itemAEnregistrer = Object.assign({}, item);

    var request = {
      user: this.user.id,
      data: {
        id : itemAEnregistrer?.patientId
      }
    }
    
    this.busyGet = this.restClient.post('beneficiaire/generateNumDossier', request)
      .subscribe(
        res => {
          console.log("resul apres generation", res);
          this.itemToSearch.isGenerate = true;

          if (!res['hasError']) {
            this.utilities.showNotification("snackbar-success",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");

             item.numeroDossierRenseigne = res['item']?.numeroDossier;

          } else {
            if (res['status'] && res['status']['message']) {
              this.utilities.showNotification("snackbar-danger",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");
            }
          }
        },
        err => {
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
          this.loading = false;
        }
      );
  }
  



  confirmTransfert(item) {

    Swal.fire({
      title: "Transfert de dossier",
      text: "Vous êtes sur le point de transferer un dosseir. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#aaa4a4",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.transfererDossier(item)
      }
    });
  }
  

  transfererDossier(item) {

    // if(!item?.numeroDossier) {
    //   this.utilities.showNotification("snackbar-danger","Veuillez génerer ou renseigner le numéro de dossier !",
    //   "bottom",
    //   "center");
    //   return;
    // }

    let itemAEnregistrer = Object.assign({}, item);

    var request = {
      user: this.user.id,
      "data": {
        "id":itemAEnregistrer?.patientId,
        "accueilId":itemAEnregistrer?.id,
        "numeroDossier": (!this.itemToSearch?.isGenerate) ? itemAEnregistrer?.numeroDossierRenseigne : null
      }
    }

    this.busyGet = this.restClient.post('beneficiaire/transfDossier', request)
      .subscribe(
        res => {
          console.log("resul", res);
          this.loading = false;

          if (!res['hasError']) {
            this.utilities.showNotification("snackbar-success",
            this.utilities.formatMsgServeur(res['status']['message']),
            "bottom",
            "center");

            this.getItems();
          } else {
            if (res['status'] && res['status']['message']) {
              this.utilities.showNotification("snackbar-danger",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");
            }
          }
        },
        err => {
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
          this.loading = false;
        }
      );
  }

  getItems() {
    
    let request = {
      user: this.user.id,
      data: { 
        // searchString : this.itemToSearch.searchTxt ? this.itemToSearch.searchTxt : null,
        beneficiaireMatricule : this.itemToSearch.searchTxt ? this.itemToSearch.searchTxt : null,
        isCheckLogic: this.noLogicCheck ? false: (( this.etapeCircuit && this.etapeCircuit2) ? true : null),
        etapeCircuit : ( this.etapeCircuit && this.etapeCircuit2) ? null : this.etapeCircuit,
        etapeCircuitParam : null,
        adminTypeActeCode: this.typeActeCode,
        uniteFoncId :  this.uniteFonctionnelleId || null,
        praticienId : this.praticienId,
        orderField:"id",
        orderDirection:"asc",
        createdAt : null,
        createdAtParam : {}

      },
      index: (this.currentPage - 1),
      size: this.itemsPerPage
    }

    console.log(" request ",request);
    
    if(this.isCaisseView) {

      let dateDebut = this.user.lastConnectionDate?.split(" ")[0];

      if (dateDebut) {
        request.data.createdAt = dateDebut + ' 00:00:00';
        request.data.createdAtParam =
          {
            "operator": "[]",
            "start": dateDebut + ' 00:00:00', //"22/02/2019",
            "end": dateDebut + ' 23:59:59' //"22/02/2019"
          }
      }
    }

    this.busyGet = this.restClient.post('accueil/getByCriteria', request)
      .subscribe(
        res => {
          if (res && res['items']) {
            this.items = res['items'];
            this.totalItems = res['count'];
            console.log('this.items:  ',this.items);
            
          }
          else {
            this.items = [];
            this.totalItems = 0;
          }
        },
        err => {
        }
      );
  }
  
  getExactlyNumberRow(page,index)
  {
      let num = index +1;
      if(page>1)
      {
          num = ((page - 1) * this.itemsPerPage) + (index+1);
      }
      return num;
  }
  
  ngOnInit() {
    if(!this.isSeeHistoConsultation) {
      this.getItems();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log("changes",changes);
    
    if(changes['refreshItem'] && changes['refreshItem'].currentValue)
    {
      this.currentPage = 1;
      this.getItems();
    }

    if(changes['isHistoriqueConsultation'] && changes['isHistoriqueConsultation'].currentValue) {
      this.itemToSearch.searchTxt = this.patient?.matriculeBeneficiaire;
    }
  }


  
}
