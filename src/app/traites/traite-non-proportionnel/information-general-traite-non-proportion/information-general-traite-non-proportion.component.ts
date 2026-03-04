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
import {CessionnaireService} from "../../../core/service/cessionnaire.service";

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
  courtierPlaceurListe : any =[];
  formDate :any={};
  traiDateEffet :string;
  traiDateEcheance :string;

  @Input() isDetails:boolean = false;
  @Input() itemToUpdate: TraiteNonProportionnel;
  @Input() isWizardProcess:boolean = false;
  @Input() idTraitNonProChild: number;
  @Input() currentTraiterNonPropoChild: any;

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
    private cessionnaireService : CessionnaireService,
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

  getCourtierPlaceurs() {
    this.cessionnaireService.getCourtiersPlaceurs().subscribe((response) => {
      if (response) {
        this.courtierPlaceurListe = response;
      } else {
        this.courtierPlaceurListe = [];
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
        if(!this.currentTraiteNonPropor?.traiteNpId) {
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
      traiteNpId : [""],
      natCode: [null, Validators.required],
      traiNumero: ["", Validators.required],
      exeCode: ["", Validators.required],
      traiReference: ["", Validators.required],
      traiEcerciceRattachement: [null],
      traiDateEffet: ["", Validators.required,],
      traiDateEcheance: ["", Validators.required,],
      traiCoursDevise: [ "", Validators.required,],
      courtierPlaceurId: [ null, Validators.required ],
      traiPeriodicite: [null, Validators.required],
      traiDelaiEnvoi: ["", Validators.required],
      traiDelaiConfirmation: ["", Validators.required],
      traiTauxCourtier: ["", Validators.required],
      traiCompteDevCode:[null, Validators.required],
      devCode: [null, Validators.required],
      traiSourceRef: [null],
      traiTauxCourtierPlaceur: ["",Validators.required],
      traiTauxAbattement: ["",Validators.required],
      traiInteretDepotLib : [null],
      traiDelaiPaiement: ["",Validators.required],
    });


  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  confirmSaveItem(item:TraiteNonProportionnel) {
    Swal.fire({
      title: "Identification",
      text:
          this.idTraitNonProChild || this.currentTraiterNonPropoChild?.traiteNpId
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

    if (!itemAEnregistrer.traiteNpId) {
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
      // if(this.currentTraiterNonPropoChild && this.currentTraiterNonPropoChild.traiteNpId){
      //     this.formulaireGroup.patchValue({...this.currentTraiterNonPropoChild,
      //       traiDateEffet: moment(this.currentTraiterNonPropoChild.traiDateEcheance).format("YYYY-MM-DD"),
      //       traiDateEcheance:moment(this.currentTraiterNonPropoChild.traiDateEffet).format("YYYY-MM-DD"),
      //     })
      // }
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
            if (this.currentTraiterNonPropoChild) {
              this.closeModal.emit(true);
              return
            }
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
    this.getCourtierPlaceurs();
    this.getExoRattachement();
    console.log('currentTraiterNonPropoChild :', this.currentTraiterNonPropoChild);
    if(this.currentTraiterNonPropoChild && this.currentTraiterNonPropoChild.traiteNpId){
      const item = {...this.currentTraiterNonPropoChild}
        this.formulaireGroup.patchValue({...this.currentTraiterNonPropoChild,
          traiDateEffet: moment(item.traiDateEcheance).format("YYYY-MM-DD"),
          traiDateEcheance:moment(item.traiDateEffet).format("YYYY-MM-DD"),
        })
    }
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
