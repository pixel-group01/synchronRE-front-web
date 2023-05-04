import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cessionnaire } from "src/app/core/models/cessionnaire";
import { RepartitionByTauxOrCapital } from "src/app/core/models/repartitionByTauxOrCapital";
import { RepartitionPlacement } from "src/app/core/models/repartitionPlacement";
import { BusinessOptionalRepartitionService } from "src/app/core/service/business-optional-repartition.service";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CessionnaireService } from "src/app/core/service/cessionnaire.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/service/user.service";

@Component({
  selector: "app-form-placement",
  templateUrl: "./form-placement.component.html",
  styleUrls: ["./form-placement.component.scss"],
})
export class FormPlacementComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  itemToSave: RepartitionPlacement = new RepartitionPlacement();
  listeCessionnaire: Cessionnaire[];
  listeRepartitions: any = [];
  listePlacementValides : any = [];
  itemToUpdate: any;
  currentAffaire: BusinessOptional;
  busySave: Subscription;
  refreshData:string;

  @Input() isWizardProcess:boolean = false;
  @Input() isDetails:boolean = false;
  @Input() isUpdatePlacement:boolean = false;
  @Input() isValidationPlacement:boolean = false;

  currentUser : User;
  listeHistoriquePlacement : any = [];
  
  constructor(
    private cessionaireService: CessionnaireService,
    private businessOptionalRepartition: BusinessOptionalRepartitionService,
    private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUserInfo();
  }

  gotoPreviousStep() {
    this.stepperInice.emit(2);
  }

  getCessionnaire() {
    this.cessionaireService.getAll().subscribe((response) => {
      if (response && response["content"]) {
        this.listeCessionnaire = response["content"] as Cessionnaire[];
      }
    });
  }

  confirmSaveItem() {
    /** Faire les controls */
    let itemAEnregistrer = Object.assign({}, this.itemToSave);

    if (
      !itemAEnregistrer ||
      !itemAEnregistrer?.repInterlocuteur ||
      !itemAEnregistrer?.repCapital ||
      !itemAEnregistrer?.repTaux ||
      !itemAEnregistrer?.repSousCommission || 
      !itemAEnregistrer?.repTauxComCourt
    ) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Tous les champs sont obligatoires !",
        "bottom",
        "center"
      );

      return;
    }

    itemAEnregistrer.cesId = this.itemToSave.cessionnaireSelected?.cesId;
    itemAEnregistrer.affId = this.currentAffaire?.affId;
    itemAEnregistrer.cessionnaireSelected = null;
    
    if (itemAEnregistrer)
      Swal.fire({
        title: "Placement",
        text:
           itemAEnregistrer?.isUpdatePlacement
            ? "Vous êtes sur le point de modifier un placement. Voulez-vous poursuivre cette action ?"
            : "Vous êtes sur le point d'enregistrer un placement. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          // On effectue l'enregistrement

          this.saveItem(itemAEnregistrer);
        }
      });
  }

  getInterlocuteur() {
    this.itemToSave.repInterlocuteur = this.itemToSave.cessionnaireSelected?.cesInterlocuteur;
  }

  saveItem(itemAEnregistrer: RepartitionPlacement) {
    if (!itemAEnregistrer.isUpdatePlacement) {
      itemAEnregistrer.cessionnaireSelected = null;
      // nous sommes au create
      this.busySave = this.businessOptionalRepartition
        .createPlacement(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response.affId) {
            this.itemToSave = {};
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.getPlacementSaisieByAff();
            this.refreshData = new Date().getTime().toString();
            // this.closeModal.emit(true);
          }
        });
    } else {
      // Nous sommes en modification
      this.busySave = this.businessOptionalRepartition
        .modificationPlacement(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response?.affId) {
            this.itemToSave = {};
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
          }
          this.refreshData = new Date().getTime().toString();
          this.getPlacementSaisieByAff();
          // this.closeModal.emit(true);
        });
    }
  }

  getPlacementSaisieByAff($event? : any) {

    console.log(" Actualisation de la liste des affaires saisies ");


    if(!this.currentAffaire?.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire selectionnée !",
        "bottom",
        "center"
      );
      return;
    }
    this.businessOptionalRepartition
      .getPlacementSaisieByAffaire(0, 10, "", this.currentAffaire?.affId)
      .subscribe((response) => {
      
        if (response && response["content"]) {
          this.listeRepartitions = response["content"];
        }else{
          this.listeRepartitions = [];
        }
      });
  }


  getPlacementEnAttenteValidation($event? : any) {

    console.log(" Actualisation de getPlacementEnAttenteValidation ");

    if(!this.currentAffaire?.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire selectionnée !",
        "bottom",
        "center"
      );
      return;
    }
    this.businessOptionalRepartition
      .getPlacementEnAttenteValidationByAffaire(0, 10, "", this.currentAffaire?.affId)
      .subscribe((response) => {
        console.log(" response ", response);

        if (response && response["content"]) {
          this.listeHistoriquePlacement = response["content"];
        }else{
          this.listeHistoriquePlacement = [];
        }
      });
  }


  getPlacementValideByAff($event? : any) {

    if(!this.currentAffaire?.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire selectionnée !",
        "bottom",
        "center"
      );
      return;
    }
    this.businessOptionalRepartition
      .getPlacementValideByAffaire(0, 10, "", this.currentAffaire?.affId)
      .subscribe((response) => {
        if (response && response["content"]) {
          this.listePlacementValides = response["content"];
        }else{
          this.listePlacementValides = [];
        }
      });
  }
  

  getRepartionByCapital(itemRepartition) {
    if (!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire sélectionnée !",
        "bottom",
        "center"
      );
      return;
    }

    let currentCapitalSaisi = itemRepartition?.repCapital; //this.getFormFiledsValue('repCapital')?.value;
    if (!currentCapitalSaisi || !currentCapitalSaisi) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucun capital defini !",
        "bottom",
        "center"
      );
      return;
    }

    this.businessOptionalRepartition
      .getRepartitionCalculatByCapital(
        this.currentAffaire.affId,
        currentCapitalSaisi
      )
      .subscribe((response) => {
        if (response) {
          let resultRepartitionTaux = response as RepartitionByTauxOrCapital;
          itemRepartition.repTaux = resultRepartitionTaux?.taux;
        }
      });
  }

  getRepartionByTaux(itemRepartition) {

    if (!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire sélectionnée !",
        "bottom",
        "center"
      );
      return;
    }

    let currentTauxSaisi = itemRepartition?.repTaux; //this.getFormFiledsValue('repTauxBesoinFac')?.value;
    if (!currentTauxSaisi || !currentTauxSaisi) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucun taux defini !",
        "bottom",
        "center"
      );
      return;
    }

    if (currentTauxSaisi > 100) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Le taux ne doit pas être supérieur à 100 !",
        "bottom",
        "center"
      );
      return;
    }

    this.businessOptionalRepartition
      .getRepartitionCalculatTaux(this.currentAffaire.affId, currentTauxSaisi)
      .subscribe((response) => {
        if (response) {
          let resultRepartitionTaux  = response as RepartitionByTauxOrCapital;
          itemRepartition.repCapital = resultRepartitionTaux?.capital;
        }
      });
  }

  /** Taraitement de la modificatioon */
  getCurrentPlacementToUpdate(placement : RepartitionPlacement){
    console.log(' placement ',placement);

    placement.isUpdatePlacement = true;
    this.itemToSave = {...placement};

    // Preseledctionner le cessionnnaire selectionné
    this.itemToSave.cessionnaireSelected = _.find(this.listeCessionnaire, (o) => { return o.cesId === placement.cesId });
  }

  ngOnInit(): void {
    this.currentAffaire =
      this.businessOptionalService.businessOptionalSubject$.value;

    this.getPlacementSaisieByAff();
    this.getCessionnaire();
    
    if(this.isUpdatePlacement) {
      // En ce moment nous pouvons avoir des placements validés
      this.getPlacementValideByAff();
      this.getPlacementEnAttenteValidation();
    }
  }
}
