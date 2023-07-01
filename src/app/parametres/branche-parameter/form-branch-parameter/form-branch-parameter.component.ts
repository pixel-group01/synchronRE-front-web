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
import { Branche } from "src/app/core/models/banche";
import { Country } from "src/app/core/models/country";
import { BrancheService } from "src/app/core/service/branche.service";
import { CountryService } from "src/app/core/service/country.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-branch-parameter',
  templateUrl: './form-branch-parameter.component.html',
  styleUrls: ['./form-branch-parameter.component.scss']
})
export class FormBranchParameterComponent implements OnInit {

  
  paramForm!: FormGroup;
  @Input() itemToUpdate: Branche; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private brancheService: BrancheService,
    private utilities: UtilitiesService
  ) {}

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      branId: [this.itemToUpdate?.branId || ""],
      branLibelle: [this.itemToUpdate?.branLibelle || "", Validators.required],
      branLibelleAbrege: [this.itemToUpdate?.branLibelleAbrege || "", Validators.required]
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Branche",
      text: (this.itemToUpdate?.branId && this.itemToUpdate?.branId > 0)
        ? "Vous êtes sur le point de modifier une branche. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer une branche. Voulez-vous poursuivre cette action ?",
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

  saveItem(item: Branche) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.branId) {
      // nous sommes au create
      this.busySuscription = this.brancheService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.branId) {
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
      this.busySuscription = this.brancheService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.branId) {
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
