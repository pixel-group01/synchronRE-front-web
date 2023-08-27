import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cedante } from "src/app/core/models/cedante";
import { Couverture } from "src/app/core/models/couverture";
import { Devise } from "src/app/core/models/devise";
import { Exercice } from "src/app/core/models/exercice";
import { User } from "src/app/core/models/user";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CedanteService } from "src/app/core/service/cedante.service";
import { CouvertureService } from "src/app/core/service/couverture.service";
import { DeviseService } from "src/app/core/service/devise.service";
import { ExerciceService } from "src/app/core/service/exercice.service";
import { UserService } from "src/app/core/service/user.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";

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
  listeDevises: Array<Devise> = [];
  isUpdateForm : boolean = false;
  dateActuelle = new Date();
  busySave : Subscription;
  currentAffaire: BusinessOptional;
  user : User;
  listeExercices: Array<Exercice> = [];
  listeStatus : any = [
    {
      libelle: "Réalisée",
      code : 'REALISEE'
    },
    {
      libelle: "En instance",
      code : 'INSTANCE'
    },
    {
      libelle: "Non réalisée",
      code : 'NON_REALISEE'
    }
  ]
  @Input() isDetails:boolean = false;
  @Input() itemToUpdate: BusinessOptional;
  @Input() isWizardProcess:boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cedanteServcie: CedanteService,
    private couvertureService: CouvertureService,
    private businessOptionalService: BusinessOptionalService,
    private utilities: UtilitiesService,
    private exerciceService: ExerciceService,
    private userService:UserService,
    private deviseService:DeviseService
  ) {
    this.user = this.userService.getCurrentUserInfo();
  }

  getCedente() {
    this.cedanteServcie.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeCedente = response["content"] as Cedante[];

        if(this.user.cedId) {
          this.createForm();
        }
       
      } else {
        this.listeCedente = [];
      }
    });
  }
 
  getDevise() {
    this.deviseService.getAll().subscribe((response: any) => {
      if (response) {
        this.listeDevises = response as Devise[];

        this.listeDevises =   _.orderBy( this.listeDevises, ['devLibelle'], ['asc']);
 
        if(this.itemToUpdate && this.itemToUpdate.affId) {
          this.createForm();
        }
       
      } else {
        this.listeDevises = [];
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

  getExercice() {
    this.exerciceService.getAll().subscribe((response : any) => {
      if (response) {

        console.log(" response exercice ",response);
        
        this.listeExercices = response as Exercice[];
        // Recuperer l'exercice courante et fixer
        if(!this.currentAffaire.affId) {
          let currentExercice = _.find(this.listeExercices, (o) => { return o.exeCourant });
          console.log(" currentExercice ",currentExercice);
          
          if(currentExercice && currentExercice.exeCode) {
            setTimeout(() => {
              this.formulaireGroup.patchValue({'exeCode':currentExercice?.exeCode})
            }, 1000);
          
          }
        }
        
      } else {
        this.listeExercices = [];
      }
    });
  }

  createForm = () => {

    console.log(" this.itemToUpdate ",this.itemToUpdate);
    
    this.formulaireGroup = this.formBuilder.group({
      affId: [this.itemToUpdate?.affId || ""],
      affCode: [this.itemToUpdate?.affCode || ""],
      affAssure: [this.itemToUpdate?.affAssure || "", Validators.required],
      affActivite: [this.itemToUpdate?.affActivite || "", Validators.required],
      affDateEffet: [
        this.itemToUpdate?.affDateEffet || ""
      ],
      affDateEcheance: [
        this.itemToUpdate?.affDateEcheance || ""
      ],
      facNumeroPolice: [
        this.itemToUpdate?.facNumeroPolice || ""
      ],
      affCapitalInitial: [
        this.itemToUpdate?.affCapitalInitial || "",
        Validators.required,
      ],
      devCode: [
        this.itemToUpdate?.devCode || "XOF",
        Validators.required,
      ],
      affStatutCreation: [
        this.itemToUpdate?.affStatutCreation || "",
        Validators.required,
      ],
      facSmpLci: [this.itemToUpdate?.facSmpLci || ""],
      facPrime: [this.itemToUpdate?.facPrime || ""],
      cedId: [ (this.itemToUpdate?.cedId || this.user?.cedId || this.itemToSave.cedenteId) || "", Validators.required],
      statutCode: [this.itemToUpdate?.statutCode || ""],
      couvertureId: [ (this.itemToUpdate?.couvertureId || this.itemToUpdate?.couId) || "", Validators.required],
      exeCode: [this.itemToUpdate?.exeCode || "", Validators.required],
      restARepartir: [""],
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
          : "Vous êtes sur le point d'enregistrer une identification. Voulez-vous poursuivre cette action ?",
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
    if (!this.isUpdateForm) {
      // nous sommes au create
      this.busySave = this.businessOptionalService
        .create(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response && response.affId) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );

            console.log(" response ",response);
            if(!itemAEnregistrer.facSmpLci) {
              this.closeModal.emit(true);
              return
            }

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
      itemAEnregistrer.facCapitaux = itemAEnregistrer.affCapitalInitial;
      this.busySave = this.businessOptionalService
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

          if (!this.isWizardProcess) {
            this.closeModal.emit(true);
          } else {
            // Nous sommes toujours sur le wizard
             // On souscrit à l'observable
             this.businessOptionalService.setCurrentOptionalBusiness(
              response as BusinessOptional
            );
            this.stepperInice.emit(2);
          }
        });
    }
  }


  ngOnInit(): void {
    // Initialisation du forms group
 
    this.currentAffaire = {...this.businessOptionalService.businessOptionalSubject$.value};
    
    if(this.currentAffaire && this.currentAffaire.affId) {
      this.isUpdateForm = true; // Pour signifier que nous sommes en modification
      this.itemToUpdate = {...this.currentAffaire};
      this.itemToUpdate.cedId = this.itemToUpdate.cedanteId || this.itemToUpdate.cedId  || this.itemToUpdate.cedenteId ;
      this.itemToUpdate.affCapitalInitial = this.itemToUpdate.affCapitalInitial || this.itemToUpdate.facCapitaux;
      // Nous allons formater la date pour eviter invalid date
      if(this.itemToUpdate && this.itemToUpdate.affDateEffet) {
        this.itemToUpdate.affDateEffet = this.utilities.formatDateInIsoData(this.itemToUpdate.affDateEffet);
      }

      if(this.itemToUpdate && this.itemToUpdate.affDateEcheance) {
        this.itemToUpdate.affDateEcheance = this.utilities.formatDateInIsoData(this.itemToUpdate.affDateEcheance);
      }
    }

    this.createForm();
    this.getCedente();
    this.getCouverture();
    this.getExercice();
    this.getDevise();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
  //     this.createForm();
  //   }
  // }
}
