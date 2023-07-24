import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from "sweetalert2";
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-form-retourner-affaire',
  templateUrl: './form-retourner-affaire.component.html',
  styleUrls: ['./form-retourner-affaire.component.scss']
})
export class FormRetournerAffaireComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  busySave : Subscription;
  itemToSave : any = {};
  currentAffaire : BusinessOptional;

  constructor(private businessOptionalService: BusinessOptionalService, private utilities: UtilitiesService,) { }

  openDetailsAffaire(isOpen:boolean) {

    //Recuperé la div details
    let divDetails = document.getElementById("details-affaire");

    if (divDetails && isOpen) {
      divDetails.classList.add("open-details");
    } else {
      // Nous fermons notre fenetre de details
      divDetails.classList.remove("open-details");
    }
  }

  confirmSaveAffaire() {
    Swal.fire({
      title: "Retourner l'affaire",
      text:"Vous êtes sur le point de retourner cette affaire. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui", 
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem();
      }
    });
  }

  saveItem() {
      let request = {
          objectId: this.currentAffaire.affId,
          staCode: "RET",
          mvtObservation: this.itemToSave.motif
      }
      this.busySave = this.businessOptionalService
        .retournerAffaire(request)
        .subscribe((response: any) => {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.closeModal.emit(true);
        });
  } 

  getMotifRetour() { 
    this.businessOptionalService.getMessageRetour(this.currentAffaire.affId).subscribe(
      (response : any) => {
        console.log(" response message de retour ",response);
        this.itemToSave.motif = response?.message  ;
      }
    )
  }

  closeFormModal(){
    this.closeModal.emit(true);
  }

  ngOnInit(): void {
    this.currentAffaire = this.businessOptionalService.businessOptionalSubject$.value;

    if(this.currentAffaire.isSeeMotifRetour) {
      this.getMotifRetour();
    }
  }

}
