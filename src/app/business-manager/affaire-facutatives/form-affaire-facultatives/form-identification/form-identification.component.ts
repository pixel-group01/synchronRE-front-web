import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cedante } from "src/app/core/models/cedante";
import { Couverture } from "src/app/core/models/couverture";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CedanteService } from "src/app/core/service/cedante.service";
import { CouvertureService } from "src/app/core/service/couverture.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-identification",
  templateUrl: "./form-identification.component.html",
  styleUrls: ["./form-identification.component.scss"],
})
export class FormIdentificationComponent implements OnInit {
  itemToSave: BusinessOptional = {};
  formulaireGroup!: FormGroup;
  listeCedente: Array<Cedante> = [];
  listeCouvertures: Array<Couverture> = [];
  dateActuelle = new Date();
  @Input() itemToUpdate: BusinessOptional;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cedanteServcie: CedanteService,
    private couvertureService: CouvertureService,
    private businessOptionalService: BusinessOptionalService,
    private utilities: UtilitiesService
  ) {}

  getCedente() {
    this.cedanteServcie.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeCedente = response["content"] as Cedante[];
      } else {
        this.listeCedente = [];
      }
    });
  }

  getCouverture() {
    this.couvertureService.getAll().subscribe((response) => {
      if (response && response["content"]) {
        this.listeCouvertures = response["content"] as Couverture[];
      } else {
        this.listeCouvertures = [];
      }
    });
  }

  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      affId: [this.itemToUpdate?.affId || ""],
      affCode: [this.itemToUpdate?.affCode || ""],
      affAssure: [this.itemToUpdate?.affAssure || "", Validators.required],
      affActivite: [this.itemToUpdate?.affActivite || "", Validators.required],
      affDateEffet: [
        this.itemToUpdate?.affDateEffet || "",
        Validators.required,
      ],
      affDateEcheance: [
        this.itemToUpdate?.affDateEcheance || "",
        Validators.required,
      ],
      facNumeroPolice: [
        this.itemToUpdate?.facNumeroPolice || "",
        Validators.required,
      ],
      affCapitalInitial: [
        this.itemToUpdate?.affCapitalInitial || "",
        Validators.required,
      ],
      facSmpLci: [this.itemToUpdate?.facSmpLci || ""],
      facPrime: [this.itemToUpdate?.facPrime || ""],
      cedenteId: [this.itemToUpdate?.cedenteId || "", Validators.required],
      statutCode: [this.itemToUpdate?.statutCode || ""],
      couvertureId: [this.itemToUpdate?.couvertureId || "", Validators.required],
      restARepartir: [this.itemToUpdate?.cedenteId || ""],
      capitalDejaReparti: [
        this.itemToUpdate?.capitalDejaReparti || ""
      ],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Identification",
      text:
        this.itemToUpdate?.affId && this.itemToUpdate?.affId > 0
          ? "Vous êtes sur le point de modifier une identification. Voulez-vous poursuivre cette action ?"
          : "Vous êtes sur le point d'enregistrer une cédante. Voulez-vous poursuivre cette action ?",
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

  saveItem(item: BusinessOptional) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.affId) {
      // nous sommes au create
      this.businessOptionalService
        .create(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response.affId) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );

            // On souscrit à l'observable
            this.businessOptionalService.setCurrentOptionalBusiness(
              response as BusinessOptional
            );
            this.stepperInice.emit(2);
          }
          // this.closeModal.emit(true);
        });
    } else {
      // Nous sommes en modification
      this.businessOptionalService
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

          if (!this.businessOptionalService.businessOptionalSubject$.value) {
            this.closeModal.emit(true);
          } else {
            this.stepperInice.emit(2);
          }
        });
    }
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getCedente();
    this.getCouverture();

    /** Valeur de l'observable au chargement */
    console.log(
      " this.businessOptionalService.businessOptionalSubject$.value ",
      this.businessOptionalService.businessOptionalSubject$.value
    );
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
  //     this.createForm();
  //   }
  // }
}
