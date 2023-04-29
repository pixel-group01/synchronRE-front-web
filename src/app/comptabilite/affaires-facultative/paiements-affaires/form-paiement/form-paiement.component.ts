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
    console.log(" itemAEnregistrer ",itemAEnregistrer);
    // return;
    
      // nous sommes au create
      this.busySave = this.reglementService
        .create('paiements',itemAEnregistrer)
        .subscribe((response: any) => {
          if (response) {

            console.log(" response",response);
            
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
        });
    
  }

  getOldPaiement(){

  }


  ngOnInit(): void {
    this.createForm();
    this.getEtatComptable();
  }

}
