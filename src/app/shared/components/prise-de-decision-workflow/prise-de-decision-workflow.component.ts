import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumCodeCircuitValidation, enumOrigineOuvertureModalForNotification } from 'src/app/core/enumerator/enumerator';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";
import * as _ from "lodash";
import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-prise-de-decision-workflow',
  templateUrl: './prise-de-decision-workflow.component.html',
  styleUrls: ['./prise-de-decision-workflow.component.scss']
})
export class PriseDeDecisionWorkflowComponent implements OnInit {

  itemToSave : any = {};
  user : any = {};
  busyGetDetails : Subscription;
  busySave : Subscription;
  loading : boolean;
  itemToSearch : any = {};
  allItems : any = [];

  @Input() itemPriseDecisionByOrigine : any = {};
  @Input() origine : any;
  @Input() listeItemByOrigine : any = [];
  @Input() origineOuvertureModal : any;
  @Output() closeItem: EventEmitter<any> = new EventEmitter();

  codeCircuit : any = {};
  itemsActes: any=[];
  itemRemise: any={};
  itemReglement: any={};
  datasAssurance: any=[];
  busyGet: Subscription;


  constructor( private authService: AuthService, private restClient: RestClientService, private modalService: BsModalService, private utilities: UtilitiesService) { 
    this.user = this.authService.currentUserValue;
    this.codeCircuit = enumCodeCircuitValidation;
  }

  getDetailsByOrigine(origine) {
    console.log(" origine ",origine);

  // Dans le cas ou il s'agit d'un inventaire on recupere la liste des ligne inventaires
    switch(origine){
      case this.codeCircuit.PHARMACIE_INVENTAIRE: {
        this.listeItemByOrigine = [];
        this.getItemsMedicamentByInventaire();
      }
    }
  }

  searchMedoc() {
    // Rechercher un medicament
    if(this.itemToSearch.libelle) {
      let listeMedocByLibelle = _.filter(this.allItems, (o) => { return  _.includes(o.pharmacieMedicamentLibelle?.toLowerCase(), this.itemToSearch.libelle?.toLowerCase()) });
      this.listeItemByOrigine = listeMedocByLibelle;
    }else {
      this.listeItemByOrigine = this.allItems;
    }
  }

  getItemsMedicamentByInventaire() {

    let request = {
      user: this.user.id,
      data: {
        inventaireId : this.itemPriseDecisionByOrigine.id,
        "orderField":"id",
        "orderDirection":"asc"
      }
    }

    this.busyGetDetails = this.restClient.post('pharmacieMedicamentInventaire/getByCriteria', request)
      .subscribe(
        res => {
          console.log(' pharmacie medicament ',res);
          
          if (res && res['items']) {
              this.listeItemByOrigine = res['items'];

              this.listeItemByOrigine.map(ism=>{
                ism.quantiteStock = ism.quantiteTheorique;
                ism.prixUnitaireVente = ism.prixUnitaireAchat;
              });

              this.allItems = this.listeItemByOrigine;

          }
        },
        err => {
        }
      );
  }

  closeModal(isClickBtnFermerture ?) {
    // this.headerComp.getNotifications();

    if(!isClickBtnFermerture) {
      if(this.origineOuvertureModal && this.origineOuvertureModal?.toLowerCase() == enumOrigineOuvertureModalForNotification.header?.toLowerCase()) {
        this.utilities.refreshNotification(this.origineOuvertureModal);
      }else {
        this.utilities.refreshNotification(enumOrigineOuvertureModalForNotification.validation_screen);
      }
    }
 
    this.closeItem.emit(true);

  }

  
  confirmSaveItem(item) {

    if (!item || !item.decision) {
      this.utilities.showNotification("snackbar-danger", "Veuillez accepter ou rejeter la demandess !",
        "bottom",
        "center");
      return;
    }

    if(item.decision?.toLowerCase() == 'rejete') {
      if (!item.libelle) {
        this.utilities.showNotification("snackbar-danger", "Veuillez renseigner le motif de rejet !",
          "bottom",
          "center");
        return;
      }
    }

    if(this.origine == this.codeCircuit.GC_DEMANDE_REMISE) {
      
      this.itemRemise.taux = this.itemRemise.taux ||0
      this.itemRemise.valeur = this.itemRemise.valeur ||0 
    }

    Swal.fire({
      title: "Décision",
      text: "Vous êtes sur le point d'apporter votre avis à cette demande. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        let objToSave = {
          entiteId: this.itemPriseDecisionByOrigine?.id,
          validateurId: this.user?.id,
          codeEntite: this.origine,
          motif : this.itemToSave.libelle,
          decision: item.decision?.toUpperCase()
        }
        this.saveItem(objToSave);
      }
    });
  }

  saveItem(item) {

    this.loading = true;

    let itemAEnregistrer = Object.assign({}, item);

    if(this.origine == this.codeCircuit.GC_DEMANDE_REMISE) {
      
      itemAEnregistrer.taux = this.itemRemise.taux
      itemAEnregistrer.valeur = this.itemRemise.valeur 
      itemAEnregistrer.decompteId = this.itemRemise.decompteId

    }

    var request = {
      user: this.user.id,
      data: itemAEnregistrer
    }

    this.busySave = this.restClient.post('pharmacieTransfert/workflowValidation', request)
      .subscribe(
        res => {
          console.log("resul", res);
          this.loading = false;

          if (!res['hasError']) {
            // if (res['items'] && res['items'].length > 0) {

            if(res['status'] && res['status']['message']) {
              this.utilities.showNotification("snackbar-success",
              this.utilities.formatMsgServeur(res['status']['message']),
              "bottom",
              "center");

              this.closeModal();
            }
            

               
            // }
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
      isSimpleLoading: false,
      data: {
        id: this.itemReglement.dataDecomnpte.dossierHospiId
        
      },
      
    };
  
    console.log('getItems: ',request);
    
    this.busyGet = this.restClient
      .post("hospiDossier/getDecompteHospi", request)
      .subscribe(
        (res:any) => {
          console.log('res: ',res);
          
        //   this.itemsActes = [
        //     {
        //         libelle:'Sejour',datasElements:[
        //           {
        //           libelle:'Flamboyant',quantite:2,prixUnitaire:4000,isPc:true
        //           },
                  
        //       ]
        //     },  
        //     {
        //       libelle:'Examen',datasElements:[
        //         {
        //         libelle:'NUMERATION FORMULE SANGUINE',quantite:2,prixUnitaire:7000,isPc:false
        //         },
        //         {
        //         libelle:'POUMON FACE ET PROFIL',quantite:2,prixUnitaire:22000,isPc:true
        //         },
        //         {
        //           libelle:'GLYCEMIE CAPILLAIRE',quantite:2,prixUnitaire:11000,isPc:true
        //           }
        //     ]
        //   },
        //   {
        //     libelle:'Prescription',datasElements:[
        //       {
        //       libelle:'Radio',quantite:2,prixUnitaire:2000,isPc:true
        //       },
        //       {
        //       libelle:'Biologie',quantite:2,prixUnitaire:12000,isPc:true
        //       }
        //   ]
        // }
        // ]
  
        if(res && res.items){
        res.items = res.items.filter(ia=>ia&&ia.datasElements&&ia.datasElements.length)
          res.items.map(it=>{
            if(it.datasElements && it.datasElements.length){
              it.datasElements.map(de=>{
                de.montant=de.quantite*de.prixUnitaire
              })
            }
          })
          this.itemsActes = res.items
        }
  
        if(this.itemsActes && this.itemsActes.length){
          this.itemsActes.map(ia=>{
            if(ia.datasElements && ia.datasElements.length){
              let quantiteTotal = 0
              let montantTotal = 0
              let montantTotalPc=0
              let montantTotalNotPc=0
              ia.datasElements.map(de=>{
                quantiteTotal += de.quantite
                montantTotal += de.quantite * de.prixUnitaire
                
                if(de.isPc){
                  
                  montantTotalPc += de.quantite * de.prixUnitaire
                }
                else{
                  montantTotalNotPc += de.quantite * de.prixUnitaire
    
                }
              })
              
              ia.datasElements.push(
                {
                  libelle:'Total',quantite:quantiteTotal,prixUnitaire:0,isPc:"",isTotal:true,montantTotal:montantTotal,
                  montantTotalPc:montantTotalPc,montantTotalNotPc:montantTotalNotPc
                }
              )
    
            }
          })
    
          this.processTotal()
        }
        
          
        },
        (err) => {}
      );
  }
  
  onEditTaux(){
    if(this.itemRemise.taux<=100){
      this.itemRemise.valeur = Math.round((this.itemRemise.taux / 100) * this.itemReglement.partPartient)
    }
    else{
      this.itemRemise.taux=100
    }
  
  }
  
  onEditValeur(){
    if(this.itemRemise.valeur<=this.itemReglement.partPartient){
      this.itemRemise.taux = (this.itemRemise.valeur/this.itemReglement.partPartient)*100
    }
    else{
      this.itemRemise.valeur=this.itemReglement.partPartient
    }
  
    
  }
   processTotal(){
    let total=0
    let totalPc=0
    let totalNotPc=0
    if(this.itemsActes && this.itemsActes.length){
  
      if(this.itemsActes && this.itemsActes.length){
        this.itemsActes.map(ia=>{
          if(ia.datasElements && ia.datasElements.length){
            ia.datasElements.map(de=>{
              if(de.isTotal){
                console.log('de: ',de);
                total+=de.montantTotal
                if(de.montantTotalPc){
                  totalPc+=de.montantTotalPc
                }
                if(de.montantTotalNotPc){
                  totalNotPc+=de.montantTotalNotPc
                }
              }
            })
          }
          
        })
      }
      
    }
    
    console.log('totalPc: ',totalPc);
    console.log('totalNotPc: ',totalNotPc);
  
    this.datasAssurance=this.itemReglement.dataDecomnpte.datasAssurance
    this.itemReglement.coutTotalActe =  total
    this.itemReglement.partAssurance=0
    this.itemReglement.partPartient=0
    if(this.datasAssurance && this.datasAssurance.length){
      this.itemReglement.partAssurance = (this.datasAssurance[0].taux/100) * totalPc 
    }
    this.itemReglement.partPartient= (totalPc - this.itemReglement.partAssurance)+totalNotPc

    this.itemRemise.valeur = (this.itemRemise.taux / 100)*this.itemReglement.partPartient
   }




  ngOnInit(): void {

    if(!this.listeItemByOrigine || this.listeItemByOrigine?.length == 0) {
      this.getDetailsByOrigine(this.origine);
    }else {

      if(this.origine == this.codeCircuit.PHARMACIE_BON_COMMANDE || this.origine == this.codeCircuit.PHARMACIE_LIVRAIONS_MEDICAMENT
        || this.origine == this.codeCircuit.PHARMACIE_SORTIE_DIVERSE) {
        this.listeItemByOrigine.forEach(article => {
          article.pharmacieMedicamentLibelle = article.nomCommercial;
        });
      }

      if(this.origine == this.codeCircuit.PHARMACIE_LIVRAIONS_MEDICAMENT) {
        if(!this.itemPriseDecisionByOrigine?.dataCommande) {
          this.itemPriseDecisionByOrigine.dataCommande = {};
        }
      }
      

      this.allItems = this.listeItemByOrigine;
    }

    if(this.origine == this.codeCircuit.GC_DEMANDE_REMISE) {
      this.itemReglement=this.itemPriseDecisionByOrigine
      this.itemRemise.raison = this.itemReglement.raison
      this.itemRemise.taux = this.itemReglement.taux
      this.itemRemise.decompteId = this.itemReglement.dataDecomnpte.id
      this.getItems()
    }
   
  }

}
