import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cessionnaire } from "src/app/core/models/cessionnaire";
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
  busySave: Subscription

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
    this.businessOptionalRepartition.getAll().subscribe((response) => {
      if (response && response["content"]) {
        console.log(" this.listeRepartitions ",this.listeRepartitions);
        
        this.listeRepartitions = response["content"];
      }
    });
  }

  ngOnInit(): void {
    this.currentAffaire =
      this.businessOptionalService.businessOptionalSubject$.value;

    this.currentAffaire = {
      affId: 6,
      affCode: null,
      affAssure: "noglo koffi",
      affActivite: "REASSUREUR",
      affDateEffet: "2023-04-25",
      affDateEcheance: "2023-04-29",
      facNumeroPolice: null,
      affCapitalInitial: 30000000,
      facSmpLci: null,
      facPrime: null,
      cedenteId: 2,
      cedNomFiliale: "NSIA BN",
      cedSigleFiliale: "NSIA BN",
      statutCode: "SAI",
      couvertureId: 1,
      restARepartir: 30000000,
      capitalDejaReparti: 0,
      etatComptable: null,
    };

    this.getRepartition();
    this.getCessionnaire();
  }
}
