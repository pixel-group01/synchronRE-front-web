import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Reglement } from 'src/app/core/models/reglement';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { ReglementService } from 'src/app/core/service/reglement.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-paiement',
  templateUrl: './form-paiement.component.html',
  styleUrls: ['./form-paiement.component.scss']
})
export class FormPaiementComponent implements OnInit {

  itemInfoCompta : any = {};
  listePaiementDejaEffectue : Reglement[] = [];
  formulaireGroup!: FormGroup;
  busySave: Subscription;
  itemToUpdate : Reglement;
  @Input() currentAffaire : BusinessOptional;
  listeDocumentsAjoutes : any = {};
  currentUser : User;
  dateActuelle = new Date()
  listeModeReglement : any = [
    {
      libelle : "Chèque"
    },
    {
      libelle : "Virement bancaire"
    }
  ]

  constructor(private reglementService:ReglementService,private formBuilder: FormBuilder,private userService: UserService,
    private utilities: UtilitiesService,private businessOptionalService:BusinessOptionalService) { 
    this.currentUser = this.userService.getCurrentUserInfo();
  }

  openPanelNewPaiement(isOpen:boolean) {

    //Recuperé la div details
    let divDetails = document.getElementById("new-paiement-bilan");

    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
    }
  }

  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      regId: [this.itemToUpdate?.regId || ""],
      regReference: [this.itemToUpdate?.regReference || "", Validators.required],
      regDate: [this.itemToUpdate?.affAssure || "", Validators.required],
      regMontant: [this.itemToUpdate?.affActivite || "", Validators.required],
      userId: [this.currentUser.userId],
      affId:[this.currentAffaire.affId],
      regMode: ["", Validators.required],
      resteAPayer: [this.itemInfoCompta?.resteARegler]
    });
  };

  getEtatComptable() {
    // On verifie si il y a un business déjà crée
    if (
      !this.currentAffaire ||
      !this.currentAffaire?.affId
    ) {
      return;
    }

    this.businessOptionalService
      .getAffaireFacultativeEtatComptable(this.currentAffaire.affId)
      .subscribe((response) => {
        if (response) {
          console.log(" response etat comptable ", response);
          this.itemInfoCompta = response;
          this.createForm();
        }
      });
  }

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem(){
    Swal.fire({
      title: "Paiement",
      text:"Vous êtes sur le point d'enregistrer un paiement. Désirez-vous poursuivre ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement
        this.saveItem(this.formulaireGroup.value);
      }
    });
  }

  saveItem(item: Reglement) {
    let itemAEnregistrer = Object.assign({}, item);
    itemAEnregistrer.regDate = moment(itemAEnregistrer.regDate).format("YYYY-MM-DD");

    let listeDocumentsAEnregistrer = [];

    // Formatage du request en format data
    let formData = new FormData();

    formData.append("regReference",itemAEnregistrer.regReference);
    formData.append("regDate",itemAEnregistrer.regDate);
    formData.append("regMontant",JSON.stringify(itemAEnregistrer.regMontant));
    formData.append("userId",JSON.stringify(itemAEnregistrer.userId) );
    formData.append("regMode",itemAEnregistrer.regMode);
    formData.append("regDocReqs",JSON.stringify(this.listeDocumentsAjoutes));


    // //Formater la liste des documents au cas ou le client a joint des documebnt
    // if(this.listeDocumentsAjoutes && this.listeDocumentsAjoutes.length > 0){
    //   this.listeDocumentsAjoutes.forEach(doc => {
    //       let formData = new FormData();

    //       formData.append('docTypeId',doc.docTypeId);
    //       formData.append('description',doc.description);
    //       formData.append('regDoc',doc.regDoc);

    //       listeDocumentsAEnregistrer.push(formData);
    //   });
    // }

    // itemAEnregistrer.regDocReqs = listeDocumentsAEnregistrer;

    // console.log(" itemAEnregistrer ",itemAEnregistrer);
    // return;
    
    let option = {
      'Content-Type':"multipart/form-data"
    }
      // nous sommes au create
      this.busySave = this.reglementService
        .create('paiements',formData,option)
        .subscribe((response: any) => {
          if (response) {

            console.log(" response",response);
            if(response?.regId){
              this.utilities.showNotification(
                "snackbar-success",
                this.utilities.getMessageOperationSuccessFull(),
                "bottom",
                "center"
              );
  
              // On actualise la liste des paiements
              this.getOldPaiement();
              this.getEtatComptable();
            }
           
          }
        });
    
  }

  getDocumentAdd($event) {
    if($event) {
      this.listeDocumentsAjoutes = $event;

      console.log(" this.listeDocumentsAjoutes ",this.listeDocumentsAjoutes);
      
    }
  }

  getOldPaiement(){
    this.busySave = this.reglementService.getReglementByAffaire('paiements',this.currentAffaire.affId).subscribe(
      (response)=> {
        console.log(" reposen get old paiement ",response);
      }
    )
  }


  ngOnInit(): void {
    this.createForm();
    this.getEtatComptable();
  }

}
