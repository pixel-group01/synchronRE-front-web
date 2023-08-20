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
import { CessionLegale } from "src/app/core/models/cessionLegale";
import { Country } from "src/app/core/models/country";
import { Type } from "src/app/core/models/type";
import { CessionLegaleService } from "src/app/core/service/cession-legale.service";
import { CountryService } from "src/app/core/service/country.service";
import { TypeParamCessService } from "src/app/core/service/typeParamCess.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-form-cession',
  templateUrl: './form-cession.component.html',
  styleUrls: ['./form-cession.component.scss']
})
export class FormCessionComponent implements OnInit {

  paramForm!: FormGroup;
  @Input() itemToUpdate: CessionLegale; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  listeCountry : Country[] = [];
  listeTypeParam : Type[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cessionLegaleService: CessionLegaleService,
    private countryService: CountryService,
    private utilities: UtilitiesService,
    private typeParamCessService:TypeParamCessService
  ) {}

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      paramCesLegId: [this.itemToUpdate?.paramCesLegId || ""],
      paramCesLegLibelle: [this.itemToUpdate?.paramCesLegLibelle || "", Validators.required],
      // paramCesLegCapital: [this.itemToUpdate?.paramCesLegCapital || "", Validators.required],
      paramCesLegTaux: [this.itemToUpdate?.paramCesLegTaux || "",
        Validators.required,
      ],
      typeId: [this.itemToUpdate?.typeId || "", Validators.required],
      paysCode: [
        this.itemToUpdate?.paysCode || "",
        Validators.required,
      ],
    });
  };

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

  getType() {
    this.typeParamCessService.getAll().subscribe(
      (response : any) => {
        if(response) {
          this.listeTypeParam = response as Type[];
          this.createForm();
        }
      }
    )
  }

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Cession légale",
      text: (this.itemToUpdate?.paramCesLegId && this.itemToUpdate?.paramCesLegId > 0)
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

  saveItem(item: CessionLegale) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.paramCesLegId) {
      // nous sommes au create
      this.busySuscription = this.cessionLegaleService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.paramCesLegId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );

          this.closeModal.emit(true);
        }
       
      });
    } else {
      // Nous sommes en modification
      this.busySuscription = this.cessionLegaleService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.paramCesLegId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
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
    this.getCountry();
    this.getType();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }


}
