import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Country } from "src/app/core/models/country";
import { Statut } from "src/app/core/models/statut";
import { CountryService } from "src/app/core/service/country.service";
import { StatutService } from "src/app/core/service/statut.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-statut',
  templateUrl: './form-statut.component.html',
  styleUrls: ['./form-statut.component.scss']
})
export class FormStatutComponent implements OnInit {

 
  paramForm!: FormGroup;
  @Input() itemToUpdate: Statut; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private statutService:StatutService,
    private utilities: UtilitiesService
  ) {}

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      staId: [this.itemToUpdate?.staId || ""],
      staCode: [this.itemToUpdate?.staCode || "", Validators.required],
      staLibelle: [this.itemToUpdate?.staLibelle || "", Validators.required],
      staLibelleLong: [
        this.itemToUpdate?.staLibelleLong || "",
        Validators.required,
      ],
      // staType: [
      //   this.itemToUpdate?.staType || "",
      //   Validators.required,
      // ],
    });
    
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Statut",
      text: (this.itemToUpdate?.staId && this.itemToUpdate?.staId > 0)
        ? "Vous êtes sur le point de modifier un pays. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer un pays. Voulez-vous poursuivre cette action ?",
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

  saveItem(item: Statut) {
    let itemAEnregistrer = Object.assign({}, item);

    if (!itemAEnregistrer.staId) {
      // nous sommes au create
      this.statutService.create(itemAEnregistrer).subscribe((response : any) => {

        if (response && response.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.statutService.update(itemAEnregistrer).subscribe((response: any) => {
 
        if (response && response?.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
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
