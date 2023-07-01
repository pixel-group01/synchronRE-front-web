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
import { Devise } from "src/app/core/models/devise";
import { CountryService } from "src/app/core/service/country.service";
import { DeviseService } from "src/app/core/service/devise.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";

@Component({
  selector: 'app-form-country',
  templateUrl: './form-country.component.html',
  styleUrls: ['./form-country.component.scss']
})
export class FormCountryComponent implements OnInit {

  paramForm!: FormGroup;
  @Input() itemToUpdate: Country; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  isUpate : boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  listeDevises: Array<Devise> = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private utilities: UtilitiesService,
    private deviseService: DeviseService
  ) {
 
  }

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      paysId: [this.itemToUpdate?.paysId || ""],
      paysCode: [this.itemToUpdate?.paysCode || "", Validators.required],
      devCode: [this.itemToUpdate?.devCode || "", Validators.required],
      paysNom: [this.itemToUpdate?.paysNom || "", Validators.required],
      paysIndicatif: [
        this.itemToUpdate?.paysIndicatif || "",
        Validators.required,
      ],
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  confirmSaveItem() {
    Swal.fire({
      title: "Pays",
      text: (this.itemToUpdate?.paysId && this.itemToUpdate?.paysId > 0)
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

  saveItem(item: Country) {
    let itemAEnregistrer = Object.assign({}, item);
    
    if (!this.isUpate) {
      // nous sommes au create
      this.busySuscription = this.countryService.create(itemAEnregistrer).subscribe((response : any) => {
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
      this.busySuscription = this.countryService.update(itemAEnregistrer).subscribe((response: any) => {
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

  getDevise() {
    this.deviseService.getAll().subscribe((response: any) => {
      console.log(" response devise ",response);
      
      if (response) {
        this.listeDevises = response as Devise[];

        this.listeDevises =   _.orderBy( this.listeDevises, ['devLibelle'], ['asc']);
 
        if(this.itemToUpdate && this.itemToUpdate.paysCode) {
          this.createForm();
        }
       
      } else {
        this.listeDevises = [];
      }
    });
  }
  
  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getDevise();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(" this.itemToUpdate ",this.itemToUpdate);
    
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {

      if(changes["itemToUpdate"].currentValue && changes["itemToUpdate"].currentValue.paysCode) {
        this.isUpate = true;
        this.createForm();
      }
     
    }else{
      this.isUpate = false;
    }
  }

}
