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
import { Bank } from "src/app/core/models/bank";
import { BankService } from "src/app/core/service/bank.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-bank",
  templateUrl: "./form-bank.component.html",
  styleUrls: ["./form-bank.component.scss"],
})
export class FormBankComponent implements OnInit {
  paramBankForm!: FormGroup;
  @Input() bankToUpdate: Bank;
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
    private utilities: UtilitiesService
  ) {}

  createForm = () => {
    this.paramBankForm = this.formBuilder.group({
      banId: [this.bankToUpdate?.banId || ""],
      banCode: [this.bankToUpdate?.banCode || "", Validators.required],
      banLibelle: [this.bankToUpdate?.banLibelle || "", Validators.required],
      // discoveryChannel: ['', Validators.required],
      banLibelleAbrege: [
        this.bankToUpdate?.banLibelleAbrege || "",
        Validators.required,
      ],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramBankForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Banque",
      text: this.bankToUpdate?.banId
        ? "Vous êtes sur le point de modifier une banque. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer une banque. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(this.paramBankForm.value);
      }
    });
  }

  saveItem(item: Bank) {
    let itemAEnregistrer = Object.assign({}, item);

    if (!itemAEnregistrer && !itemAEnregistrer.banId) {
      // nous sommes au create
      this.bankService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.banId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.bankService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.banId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
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
    if (changes["bankToUpdate"] && changes["bankToUpdate"].currentValue) {
      this.createForm();
    }
  }
}
