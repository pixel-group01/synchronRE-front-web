import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalRepartition } from 'src/app/core/models/businessOptionalRepartition';
import { Cedante } from 'src/app/core/models/cedante';
import { Couverture } from 'src/app/core/models/couverture';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { CouvertureService } from 'src/app/core/service/couverture.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-repartition',
  templateUrl: './form-repartition.component.html',
  styleUrls: ['./form-repartition.component.scss']
})
export class FormRepartitionComponent implements OnInit {

  itemToSave : BusinessOptionalRepartition = {};
  formulaireGroup!: FormGroup;
  listeCouvertures : Array<Couverture> = [];
  dateActuelle = new Date();
  @Input() itemToUpdate: BusinessOptionalRepartition; 
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private couvertureService: CouvertureService,
    private businessOptionalService: BusinessOptionalService,
    private utilities: UtilitiesService
  ) {}


  getCouverture(){
    this.couvertureService.getAll().subscribe(
      (response) => {
        if (response && response['content']) {
          this.listeCouvertures = response['content'] as Couverture[];
        }
        else {
          this.listeCouvertures = [];
        }
      }
    )
  }

  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      repId: [this.itemToUpdate?.affId || ""],
      repCapital: [this.itemToUpdate?.repCapital || ""],
      repTaux: [this.itemToUpdate?.repTaux || "", Validators.required],
      repTauxBesoinFac: [this.itemToUpdate?.repTauxBesoinFac || "",Validators.required],
      repSousCommission: [this.itemToUpdate?.repSousCommission || "", Validators.required],
      repInterlocuteur: [this.itemToUpdate?.repInterlocuteur || "", Validators.required],
      affId: [this.itemToUpdate?.affId || "", Validators.required],
      cesId: [this.itemToUpdate?.cesId || "", Validators.required],
      paramCesLegalId: [this.itemToUpdate?.paramCesLegalId || ""],
      typId: [this.itemToUpdate?.typId || ""]
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Répartition",
      text: (this.itemToUpdate?.repId && this.itemToUpdate?.repId > 0)
        ? "Vous êtes sur le point de modifier une répartition. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer une répartition. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {

        // Pour l'heure on va a l'étape suivante
        this.stepperInice.emit(3);

        // this.saveItem(this.formulaireGroup.value);
      }
    });
  }

  saveItem(item: BusinessOptional) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.affId) {
      // nous sommes au create
      this.businessOptionalService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        // this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.businessOptionalService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        // this.closeModal.emit(true);
      });
    }
  }

  gotoPreviousStep() {
    this.stepperInice.emit(1);
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getCouverture();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
  //     this.createForm();
  //   }
  // }

}
