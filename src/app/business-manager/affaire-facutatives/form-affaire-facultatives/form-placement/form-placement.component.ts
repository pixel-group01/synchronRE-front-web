import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
  itemToUpdate: any;
  currentAffaire: BusinessOptional;
  isUpdateRepartition: boolean;
  busySave: Subscription;

  constructor(
    private cessionaireService: CessionnaireService,
    private businessOptionalRepartition: BusinessOptionalRepartitionService,
    private utilities: UtilitiesService,
    private businessOptionalService: BusinessOptionalService
  ) {}

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
      !itemAEnregistrer?.repSousCommission
    ) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Tous les champs sont obligatoires !",
        "bottom",
        "center"
      );

      return;
    }

    itemAEnregistrer.affId = this.currentAffaire?.affId;
    itemAEnregistrer.repTauxBesoinFac = 14;

    if (itemAEnregistrer)
      Swal.fire({
        title: "Placement",
        text:
          this.itemToUpdate?.affId && this.itemToUpdate?.affId > 0
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

  saveItem(itemAEnregistrer: RepartitionPlacement) {
    if (!this.isUpdateRepartition) {
      // nous sommes au create
      this.busySave = this.businessOptionalRepartition
        .createPlacement(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response.affId) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.getRepartition();
            // this.closeModal.emit(true);
          }
        });
    } else {
      // Nous sommes en modification
      this.busySave = this.businessOptionalRepartition
        .update(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response?.affId) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
          }
          this.getRepartition();
          // this.closeModal.emit(true);
        });
    }
  }

  getRepartition() {

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
      .getPlacementByAffaire(0, 10, "", this.currentAffaire?.affId)
      .subscribe((response) => {
        console.log(" response ", response);

        if (response && response["content"]) {
          console.log(" this.listeRepartitions ", this.listeRepartitions);

          this.listeRepartitions = response["content"];
        }
      });
  }

  confirmDeletePlacement(repartition) {
    Swal.fire({
      title: "Suppression placement",
      text:"Vous êtes sur le point de supprimer un placement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue l'enregistrement

        this.deletePlacement(repartition?.repId);
      }
    });
  }

  deletePlacement(idRepartition) {
   this.busySave = this.businessOptionalRepartition.deleteRepartitionPlacement(idRepartition).subscribe(
    (response) => {
      console.log(" response ",response);
      this.utilities.showNotification(
        "snackbar-success",
        this.utilities.getMessageOperationSuccessFull(),
        "bottom",
        "center"
      );

      this.getRepartition();
    }
   )
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

    let currentTauxSaisi = itemRepartition?.repTauxBesoinFac; //this.getFormFiledsValue('repTauxBesoinFac')?.value;
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


  ngOnInit(): void {
    this.currentAffaire =
      this.businessOptionalService.businessOptionalSubject$.value;

    // this.currentAffaire = {
    //   affId: 8,
    //   affCode: null,
    //   affAssure: "noglo koffi",
    //   affActivite: "REASSUREUR",
    //   affDateEffet: "2023-04-25",
    //   affDateEcheance: "2023-04-29",
    //   facNumeroPolice: null,
    //   affCapitalInitial: 30000000,
    //   facSmpLci: null,
    //   facPrime: null,
    //   cedId: 2,
    //   cedNomFiliale: "NSIA BN",
    //   cedSigleFiliale: "NSIA BN",
    //   statutCode: "SAI",
    //   couvertureId: 1,
    //   restARepartir: 30000000,
    //   capitalDejaReparti: 0,
    //   etatComptable: null,
    // };

    this.getRepartition();
    this.getCessionnaire();
  }
}
