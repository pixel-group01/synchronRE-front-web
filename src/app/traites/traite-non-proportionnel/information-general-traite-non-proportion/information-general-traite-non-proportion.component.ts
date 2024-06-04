import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Devise } from 'src/app/core/models/devise';
import { Exercice } from 'src/app/core/models/exercice';
import { User } from 'src/app/core/models/user';;
import { DeviseService } from 'src/app/core/service/devise.service';
import { ExerciceService } from 'src/app/core/service/exercice.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';
import * as _ from "lodash";
import { NatureService } from 'src/app/core/service/nature.service';
import { PeriodiciteService } from 'src/app/core/service/periodicite.service';
import { ExoRattachementService } from 'src/app/core/service/exo-rattachement.service';
import { TraiteNonProportionnel } from 'src/app/core/models/traite-non-proportionnel.model';
import { TraiteNonProportionnelService } from 'src/app/core/service/traite-non-proportionnel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-information-general-traite-non-proportion',
  templateUrl: './information-general-traite-non-proportion.component.html',
  styleUrls: ['./information-general-traite-non-proportion.component.scss']
})
export class InformationGeneralTraiteNonProportionComponent implements OnInit {

  formulaireGroup!: FormGroup;
  listeDevises: Array<Devise> = [];

  isUpdateForm : boolean = false;
  dateActuelle = new Date();
  busySave : Subscription;
  currentTraiteNonPropor: TraiteNonProportionnel;
  user : User;
  listeExercices: Array<Exercice> = [];

  natureListe : any =[];
  exoRattachement : any = [];
  periodiciteListe : any = [];
  formDate :any={};
  traiDateEffet :string;
  traiDateEcheance :string;

  @Input() isDetails:boolean = false;
  @Input() itemToUpdate: TraiteNonProportionnel;
  @Input() isWizardProcess:boolean = false;
  @Input() idTraitNonProChild: number;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() sendInfoParent: EventEmitter<number> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private traiteNonPropertionnelService: TraiteNonProportionnelService,
    private utilities: UtilitiesService,
    private exerciceService: ExerciceService,
    private userService:UserService,
    private natureService : NatureService,
    private periodiciteListeService : PeriodiciteService,
    private exoRattachemenService : ExoRattachementService,
    private deviseService:DeviseService
  ) {
    this.user = this.userService.getCurrentUserInfo();
  }
 
  getDevise() {
    this.deviseService.getAll().subscribe((response: any) => {
      if (response) {
        this.listeDevises = response as Devise[];
        this.listeDevises =   _.orderBy( this.listeDevises, ['devCode'], ['asc']);
        this.formulaireGroup.patchValue({'devCode':'XOF','traiCompteDevCode':'XOF' });
        if(this.formulaireGroup.value.devCode =="XOF"){
            this.formulaireGroup.patchValue({'traiCoursDevise':1});
        }
      } else {
        this.listeDevises = [];
      }
    });
  }

  clearCours(){
    if(this.formulaireGroup.value.devCode !="XOF" || this.formulaireGroup.value.traiCoursDevise ==1){
      this.formulaireGroup.patchValue({'traiCoursDevise': ""});
     }else{
      this.formulaireGroup.patchValue({'traiCoursDevise':1});
    }
  }

  getNature() {
    this.natureService.getAll().subscribe((response) => {
      if (response) {
        this.natureListe = _.orderBy( (response), ['formeLibelle'], ['asc']);
      } else {
        this.natureListe = [];
      }
    });
  }

  getExoRattachement() {
    this.exoRattachemenService.getAll().subscribe((response) => {
      if (response) {
        this.exoRattachement = response;
      } else {
        this.exoRattachement = [];
      }
    });
  } 

  formatDateTraiDateEffet(evt:any){    
    if(evt){
      this.traiDateEffet = moment(evt).format("YYYY-MM-DD");
    }
  }

  formatDateTraiDateEcheance(evt:any){    
    if(evt){
      this.traiDateEcheance = moment(evt).format("YYYY-MM-DD");
    }
  }

  getEditTraiterNonPropo(idTraitNonPro :number){
    this.traiteNonPropertionnelService.getEdit(idTraitNonPro).subscribe((res:any)=>{
      // console.log("res retour :", res);
      this.formulaireGroup.patchValue({...res})
    })
  }

  getPeriodiciteListe() {
    this.periodiciteListeService.getAll().subscribe((response) => {
      if (response) {        
        this.periodiciteListe = response;

      } else {
        this.periodiciteListe = [];
      }
    });
  }

  getExercice() {
    this.exerciceService.getAll().subscribe((response : any) => {
      if (response) {
        this.listeExercices = response as Exercice[];
        // Recuperer l'exercice courante et fixer
        if(!this.currentTraiteNonPropor?.nontraiteProportionnelId) {
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
    // console.log(" this.itemToUpdate ",this.itemToUpdate);
    this.formulaireGroup = this.formBuilder.group({
      nontraiteProportionnelId : [""],
      natCode: [null, Validators.required],
      traiNumero: ["", Validators.required],
      exeCode: ["", Validators.required],
      traiReference: ["", Validators.required],
      traiEcerciceRattachement: [null],
      traiDateEffet: ["", Validators.required,],
      traiDateEcheance: ["", Validators.required,],
      traiCoursDevise: [ "", Validators.required,],
      traiAuteur: [ "", Validators.required ],
      traiPeriodicite: [null, Validators.required],
      traiDelaiEnvoi: ["", Validators.required],
      traiDelaiConfirmation: ["", Validators.required],
      traiTauxCourtier: ["", Validators.required],
      traiCompteDevCode:[null, Validators.required],
      devCode: [null, Validators.required],
      traiSourceRef: [null],
      traiTauxCourtierPlaceur: ["",Validators.required],   
    });


  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem(item:TraiteNonProportionnel) {
    Swal.fire({
      title: "Identification",
      text:
        this.itemToUpdate?.nontraiteProportionnelId && this.itemToUpdate?.nontraiteProportionnelId > 0
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
        this.saveItem(item);
      }
    });
  } 

  saveItem(item: TraiteNonProportionnel) {
    let itemAEnregistrer = {...item};
    if (!itemAEnregistrer.nontraiteProportionnelId) {
      // nous sommes au create
    if (this.traiDateEffet) {
      itemAEnregistrer.traiDateEffet = this.traiDateEffet
    }
    if (this.traiDateEcheance) {
      itemAEnregistrer.traiDateEcheance = this.traiDateEcheance
    }
   
      this.busySave = this.traiteNonPropertionnelService
        .create(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            // console.log(" response ",response); 
            this.stepperInice.emit(2);
          }
          this.sendInfoParent.emit(response.traiteNpId)
          // this.closeModal.emit(true);
        });
    } else { 
      // Nous sommes en modification
      this.busySave = this.traiteNonPropertionnelService
        .update(itemAEnregistrer)
        .subscribe((response: any) => {
          if (response) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.stepperInice.emit(2);
          }

          // if (!this.isWizardProcess) {
          //   this.closeModal.emit(true);
          // } 
        });
    }
  }


  ngOnInit(): void {
    this.createForm();
    this.getDevise()
    this.getNature()
    this.getPeriodiciteListe();
    this.getExercice();
    this.getDevise();
    this.getExoRattachement()
    if (this.idTraitNonProChild) {
        this.getEditTraiterNonPropo(this.idTraitNonProChild)
    }
  }
 
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
  //     this.createForm();
  //   }
  // }
}
