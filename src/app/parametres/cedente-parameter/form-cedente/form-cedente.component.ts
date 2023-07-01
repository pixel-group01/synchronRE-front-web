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
import { Cedante } from "src/app/core/models/cedante";
import { Country } from "src/app/core/models/country";
import { CedanteService } from "src/app/core/service/cedante.service";
import { CountryService } from "src/app/core/service/country.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-form-cedente',
  templateUrl: './form-cedente.component.html',
  styleUrls: ['./form-cedente.component.scss']
})
export class FormCedenteComponent implements OnInit {
  paramForm!: FormGroup;
  @Input() itemToUpdate: Cedante; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  listeCountry : Country[] = [];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cedanteServcie: CedanteService,
    private utilities: UtilitiesService,
    private countryService : CountryService
  ) {}

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      cedId: [this.itemToUpdate?.cedId || ""],
      cedNomFiliale: [this.itemToUpdate?.cedNomFiliale || "", Validators.required],
      cedSigleFiliale: [this.itemToUpdate?.cedSigleFiliale || "", Validators.required],
      cedTel: [this.itemToUpdate?.cedTel || "",Validators.required],
      cedEmail: [this.itemToUpdate?.cedEmail || "", Validators.required],
      cedAdressePostale: [this.itemToUpdate?.cedAdressePostale || "", Validators.required],
      cedFax: [this.itemToUpdate?.cedFax || "", Validators.required],
      cedSituationGeo: [this.itemToUpdate?.cedSituationGeo || "", Validators.required],
      cedStatut: [this.itemToUpdate?.cedStatut || ""],
      paysCode : [this.itemToUpdate?.paysCode || ""],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {

    // Verifier si l'email est correcte
    let currentValueForm = {...this.paramForm.value};
 
    if(currentValueForm.cedEmail) {
      if(!this.utilities.checkEmailValidity(currentValueForm.cedEmail)){
        this.utilities.showNotification(
          "snackbar-danger",
          "Veuillez renseigner un mail valide !",
          "bottom",
          "center"
        );
        return
      }
    }

    Swal.fire({
      title: "Cédante",
      text: (this.itemToUpdate?.cedId && this.itemToUpdate?.cedId > 0)
        ? "Vous êtes sur le point de modifier une cédante. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer une cédante. Voulez-vous poursuivre cette action ?",
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

  saveItem(item: Cedante) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.cedId) {
      // nous sommes au create
      this.busySuscription = this.cedanteServcie.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
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
      this.busySuscription = this.cedanteServcie.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
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


  getCountry() {
    this.countryService.getAll().subscribe(
      (response : any) => {
        if(response && response.content) {
          this.listeCountry = response.content as Country[];
          this.createForm();
        }
      }
    )
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getCountry();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }


}
