import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { CompteService } from 'src/app/core/service/compte.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-tranche',
  templateUrl: './form-tranche.component.html',
  styleUrls: ['./form-tranche.component.scss']
})
export class FormTrancheComponent implements OnInit {

  itemToSave : any = {};
  ListeCedantes : any = [];
  Liste : any = [];
  ListeCessionnaires : any = [];
  ListeDesignations : any = [];
  busySave: Subscription;
  currentItemCompte : any = {};
  @Input() currentTranche : any;
  
  constructor(private cedenteService: CedanteService,private utilities: UtilitiesService,private compteService : CompteService) { }


  // getCedante() {
  //   this.cedenteService.getAll().subscribe(
  //     (response : any) => {
  //       console.log("response ",response);
  //       if(response && response.length) {
  //         this.ListeCedantes = response;
  //       }
  //     }
  //   )
  // }
 

  confirmSaveItem() {
    Swal.fire({
      title: "Enregistrement",
      text: "Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {

        //Recuperer le traité
        let currentValueCompte = JSON.parse(sessionStorage.getItem("refreshValue"));

        let currentTrancheDto = this.currentTranche;

        console.log(" currentValueCompte ",currentValueCompte);
        
        if(!this.itemToSave.cedId) {
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner une cédante !",
            "bottom",
            "center"
          );
          return
        }

        if(!currentValueCompte?.traiteSelected){
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner un traité !",
            "bottom",
            "center"
          );
          return
        }

        if(!currentValueCompte?.periodeSelected){
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner une période !",
            "bottom",
            "center"
          );
          return
        }

        if(!currentValueCompte?.exerciceSelected){
          this.utilities.showNotification(
            "snackbar-danger",
            "Veuillez sélectionner un exercice !",
            "bottom",
            "center"
          );
          return
        }

        currentTrancheDto.cedIdSelected = this.itemToSave.cedId;

        let itemAEnregistrer = {
          "compteId": null,
          "traiteNpId": currentValueCompte?.traiteSelected?.traiteNpId,
          "exeCode": currentValueCompte.exerciceSelected,
          "traiReference": currentValueCompte?.traiteSelected?.traiReference,
          "traiNumero": currentValueCompte?.traiteSelected?.traiNumero,
          "natCode": currentValueCompte?.traiteSelected?.natCode,
          "natLibelle": currentValueCompte?.traiteSelected?.natLibelle,
          "traiPeriodicite": currentValueCompte?.traiteSelected?.traiPeriodicite,
          "traiEcerciceRattachement": currentValueCompte?.traiteSelected?.traiEcerciceRattachement,
          "trancheIdSelected": this.currentTranche?.trancheId,
          "periodeId": currentValueCompte?.periodeSelected?.periodeId,
          trancheCompteDtos : [currentTrancheDto]
        };
       
        this.saveItem(itemAEnregistrer);
      }
    });
  }

  saveItem(item: any) {

    let itemAEnregistrer = {...item};

    this.busySave = this.compteService.saveCompte(itemAEnregistrer)
    .subscribe((response: any) => {
   
      // if (response && response.repId) {
      if(response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
      }
        
    });
  }

  ngOnInit(): void {
    // this.getCedante();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["currentTranche"] && changes["currentTranche"].currentValue) {
      if(this.currentTranche?.compteDetails) {
        this.ListeDesignations = this.currentTranche?.compteDetails || [];
      }

      if(this.currentTranche?.compteCessionnaires) {
        this.ListeCessionnaires = this.currentTranche?.compteCessionnaires || [];
      }

      if(this.currentTranche?.cedantes) {
        this.ListeCedantes = this.currentTranche?.cedantes;
      }
    }
    
  }

}
