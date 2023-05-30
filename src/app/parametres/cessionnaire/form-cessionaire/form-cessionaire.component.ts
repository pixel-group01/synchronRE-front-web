import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cessionnaire } from 'src/app/core/models/cessionnaire';
import { CessionnaireService } from 'src/app/core/service/cessionnaire.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cessionaire',
  templateUrl: './form-cessionaire.component.html',
  styleUrls: ['./form-cessionaire.component.scss']
})
export class FormCessionaireComponent implements OnInit {

  paramForm!: FormGroup;
  @Input() itemToUpdate: Cessionnaire; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
 // listeCountry : Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cessionnaireService: CessionnaireService,
    private utilities: UtilitiesService
  ) {}

  createForm = () => {

    this.paramForm = this.formBuilder.group({
      cesId: [this.itemToUpdate?.cesId || ""],
      cesNom: [this.itemToUpdate?.cesNom || ""],
      cesSigle: [this.itemToUpdate?.cesSigle || "", Validators.required],
      cesEmail: [this.itemToUpdate?.cesEmail || ""],
      cesTelephone: [this.itemToUpdate?.cesTelephone || "",
        Validators.required,
      ],
      cesSituationGeo: [this.itemToUpdate?.cesSituationGeo || "",
      Validators.required,
    ],
    cesInterlocuteur: [this.itemToUpdate?.cesInterlocuteur || "",
    Validators.required,
  ],
      cesAdressePostale: [
        this.itemToUpdate?.cesAdressePostale || "",
        Validators.required,
      ],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Cessionnaire",
      text: (this.itemToUpdate?.cesId && this.itemToUpdate?.cesId > 0)
        ? "Vous êtes sur le point de modifier un cessionnaire. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer un cessionnaire. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(this.paramForm.value);
      }
    });
  }

  saveItem(item: Cessionnaire) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.cesId) {
      // nous sommes au create
      this.cessionnaireService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.paramCesLegId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );

          this.closeModal.emit(true);
        }
       
      });
    } else {
      // Nous sommes en modification
      this.cessionnaireService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.paramCesLegId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );

          this.closeModal.emit(true);
        }
       
      });
    }
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }

}
