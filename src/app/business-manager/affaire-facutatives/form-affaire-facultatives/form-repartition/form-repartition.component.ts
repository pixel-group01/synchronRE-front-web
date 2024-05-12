import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { BusinessOptionalRepartition, CalculateRelartitionRequest, CalculateRelartitionResponse, RepartitionTraiteeBesoinFac } from "src/app/core/models/businessOptionalRepartition";
import { CessionLegale } from "src/app/core/models/cessionLegale";
import { Couverture } from "src/app/core/models/couverture";
import { RepartitionByTauxOrCapital } from "src/app/core/models/repartitionByTauxOrCapital";
import { RepartitionCedanteCessionLegal } from "src/app/core/models/repartitionCedanteCessionLegal";
import { User } from "src/app/core/models/user";
import { BusinessOptionalRepartitionService } from "src/app/core/service/business-optional-repartition.service";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CouvertureService } from "src/app/core/service/couverture.service";
import { UserService } from "src/app/core/service/user.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";

@Component({
  selector: "app-form-repartition",
  templateUrl: "./form-repartition.component.html",
  styleUrls: ["./form-repartition.component.scss"],
}) 
export class FormRepartitionComponent implements OnInit {
  itemToSave: BusinessOptionalRepartition = {};
  formulaireGroup!: FormGroup;
  
  listeCouvertures: Array<Couverture> = [];
  listeCessionLegale: Array<CessionLegale> = [];
  oldDataRepartition : any = {};
  listeParametreCessionsLegale: any = [];
  listeCessionLegalePremierFranc : CessionLegale[] = [];
  currentAffaire: BusinessOptional;
  repartitionBesoinFac: RepartitionByTauxOrCapital;
  dateActuelle = new Date();
  busySave: Subscription;
  repartitionTraiteItem : RepartitionTraiteeBesoinFac = {};
  user : User;
  
  @Input() itemToUpdate: BusinessOptionalRepartition;
  @Input() isWizardProcess: boolean = false;
  @Input() isUpdateRepartition: boolean = false;
  @Input() isDetails: boolean = false;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private couvertureService: CouvertureService,
    private businessOptionalService: BusinessOptionalService,
    private businessOptionalRepartitionService: BusinessOptionalRepartitionService,
    private utilities: UtilitiesService,
    private userService:UserService) {
      this.user = this.userService.getCurrentUserInfo();
    }

  // getCouverture() {
  //   this.couvertureService.getAll().subscribe((response) => {
  //     if (response && response["content"]) {
  //       this.listeCouvertures = response["content"] as Couverture[];
  //     } else {
  //       this.listeCouvertures = [];
  //     }
  //   });
  // }

  getRepartitionCalculate($event:any,currentCession ? : any) {

    
    if(!this.itemToSave.repCapital && !this.itemToSave.repTaux) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner le capital !",
        "bottom",
        "center"
      );
      return
    }

    let req : CalculateRelartitionRequest;

    let paramsCessionLegals = [];

    this.listeParametreCessionsLegale.forEach(parametre => {
        if(parametre.checked) {
          paramsCessionLegals.push(parametre.paramCesLegalId)
        }
    });

    req = {
      affId : this.currentAffaire.affId,
      repCapital : !this.itemToSave.repTaux ? this.itemToSave.repCapital : null,
      repTaux : this.itemToSave.repTaux,
      repId : this.itemToSave.repId,
      repIdToBeModified : currentCession?.repId || null,
      pclIds : paramsCessionLegals
    }
    this.businessOptionalRepartitionService.getCalculRepartition(req).subscribe((response : any) => {

      if(response && response?.affId) {
        this.oldDataRepartition.updateCesLegReqs = response?.paramCesLegs;
        this.itemToSave.repCapital = response?.repCapital;
        this.itemToSave.repTaux = response?.repTaux;
        this.itemToSave.besoinFacInitial = response?.besoinFac;
        this.itemToSave.repTauxBesoinFac = response?.repTaux;
        
        // Mise a jour de la banière des d"tails
        this.repartitionBesoinFac.besoinFacRestant = response?.besoinFacRestant;

        this.getMatchCessionLegaleInUpdate(true);
      }
    });
  }

  // createForm = () => {
  //   this.formulaireGroup = this.formBuilder.group({
  //     repId: [this.itemToUpdate?.affId || ""],
  //     repCapital: [this.itemToUpdate?.repCapital || ""],
  //     repTaux: [this.itemToUpdate?.repTaux || ""],
  //     repTauxBesoinFac: [this.itemToUpdate?.repTauxBesoinFac || ""],
  //     repSousCommission: [this.itemToUpdate?.repSousCommission || ""],
  //     repInterlocuteur: [this.itemToUpdate?.repInterlocuteur || ""],
  //     affId: [this.itemToUpdate?.affId || ""],
  //     // cesId: [this.itemToUpdate?.cesId || "", Validators.required],
  //     paramCesLegalId: [this.itemToUpdate?.paramCesLegalId || ""],
  //     typId: [this.itemToUpdate?.typId || ""],
  //     besoinFacInitial: [this.itemToUpdate?.besoinFacInitial || ""],
  //     repartitionCessionLegal: this.formBuilder.array([]),
  //   });
  // };

  // getFormFiledsValue = (field: string) => {
  //   return this.formulaireGroup.get(field);
  // };

  getFormCessionLegale(): FormArray {
    return this.formulaireGroup.get("repartitionCessionLegal") as FormArray;
  }

  getValueFormCessionLegal(paramCession: CessionLegale) {
    return {
      repCapital: paramCession.repCapital,
      repTaux: paramCession.repTaux,
      repTauxBesoinFac: "",
      repSousCommission: 0,
      repId : paramCession.repId || null,
      affId: this.currentAffaire?.affId,
      paramCesLegalId: paramCession.paramCesLegId || paramCession.paramCesLegalId,
      paramCesLegLibelle: paramCession?.paramCesLegLibelle,
      checked : !this.isDetails ? true : false,
      accepte : paramCession?.accepte,
      prime : paramCession?.prime
    };
  }

  getMatchCessionLegaleInUpdate(canResetCheckBox : boolean = false){

    
    if(this.oldDataRepartition.updateCesLegReqs && this.listeParametreCessionsLegale && this.listeParametreCessionsLegale.length) {
      this.listeParametreCessionsLegale.forEach(cession => {

        if(!canResetCheckBox) {
          cession.checked = false;
        }
       
        if(cession.paramCesLegalId){
          let oldParamCession = _.find(this.oldDataRepartition.updateCesLegReqs, (o) => { return o.paramCesLegalId === cession.paramCesLegalId});

          if(oldParamCession && oldParamCession.repId && oldParamCession.paramCesLegalId) {
            cession.checked = oldParamCession?.accepte;
            cession.repCapital = oldParamCession?.repCapital;
            cession.repTaux = oldParamCession?.repTaux;
            cession.repId = oldParamCession?.repId
          }
        }
     });
    }
  }

  confirmSaveItem() {
    Swal.fire({
      title: "Répartition",
      text:
        this.isUpdateRepartition
          ? "Vous êtes sur le point de modifier une répartition. Voulez-vous poursuivre cette action ?"
          : "Vous êtes sur le point d'enregistrer une répartition. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        /** On format le request à ce niveau comme le backend le veut  */
        // let currentValueRepartion = { ...this.itemToSave };

        // // Recupererons les cessions cochés
        // let cessionsCoches = _.filter(this.listeParametreCessionsLegale, (o) => { return o.checked; }); 

        // if(this.itemToSave.repId && this.itemToSave.repId > 0) {
        //   cessionsCoches = this.listeParametreCessionsLegale; // _.filter(this.listeParametreCessionsLegale, (o) => { return o.checked; });
        //   cessionsCoches.forEach(cession => {
        //     // cession.repId  = this.itemToSave.repId || null,
        //     cession.accepte = cession.checked
        //   });
        // }

        // let requestRepartition: RepartitionCedanteCessionLegal = {
        //   cesLegDtos: !this.itemToSave.repId ? cessionsCoches : null,
        //   updateCesLegReqs :  this.itemToSave.repId ? cessionsCoches : [],
        //   repCapital: currentValueRepartion.repCapital,
        //   repTauxBesoinFac: currentValueRepartion.repTauxBesoinFac,
        //   affId: this.currentAffaire?.affId,
        //   repId  :this.itemToSave.repId || null,
        //   repTaux: currentValueRepartion.repTaux,
        //   repSousCommission: 0,
        // };
        this.saveItem(this.repartitionTraiteItem);
      }
    });
  }

  saveItem(item: RepartitionTraiteeBesoinFac) {

    item.paramCesLegs = this.listeParametreCessionsLegale;
    item.paramCesLegsPremierFranc = this.listeCessionLegalePremierFranc;
    let itemAEnregistrer = Object.assign({}, item);

    this.busySave = this.businessOptionalRepartitionService
    .saveRepartition(itemAEnregistrer)
    .subscribe((response: any) => {
   
      // if (response && response.repId) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );

        // Dans le cas ou c'est une cedente on ferme le modal
        if( (this.user && this.user?.cedId) || !this.isWizardProcess){
          this.closeModal.emit(true);
        }else{
          this.stepperInice.emit(3);
        }
       
      // }
    });

    // if (!this.isUpdateRepartition) {
    //   // nous sommes au create
    //   this.busySave = this.businessOptionalRepartitionService
    //     .saveRepartition(itemAEnregistrer)
    //     .subscribe((response: any) => {
       
    //       if (response && response.repId) {
    //         this.utilities.showNotification(
    //           "snackbar-success",
    //           this.utilities.getMessageOperationSuccessFull(),
    //           "bottom",
    //           "center"
    //         );

    //         // Dans le cas ou c'est une cedente on ferme le modal
    //         if( (this.user && this.user?.cedId) || !this.isWizardProcess){
    //           this.closeModal.emit(true);
    //         }else{
    //           this.stepperInice.emit(3);
    //         }
           
    //       }
    //     });
    // } else {
    //   // Nous sommes en modification
    //   this.busySave = this.businessOptionalRepartitionService
    //     .saveRepartition(itemAEnregistrer)
    //     .subscribe((response: any) => {
    //       if (response && response?.repId) {
    //         this.utilities.showNotification(
    //           "snackbar-success",
    //           this.utilities.getMessageOperationSuccessFull(),
    //           "bottom",
    //           "center"
    //         );

    //         if (!this.isWizardProcess) {
    //           this.closeModal.emit(true);
    //         } else {
    //           this.stepperInice.emit(3);
    //         }
    //       }
    //     });
    // }
  }

  gotoPreviousStep() {
    this.stepperInice.emit(1);
  }

  // getRepartionByCapital(valueParamCession?:number) {

  //   if (!this.currentAffaire || !this.currentAffaire.affId) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucune affaire sélectionnée !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   let currentCapitalSaisi = valueParamCession || this.itemToSave?.repCapital; //this.getFormFiledsValue('repCapital')?.value;
  //   if (!currentCapitalSaisi) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucun capital defini !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   this.businessOptionalRepartitionService
  //     .getRepartitionCalculatByCapital(
  //       this.currentAffaire.affId,
  //       currentCapitalSaisi,
  //       this.itemToSave.repId
  //     )
  //     .subscribe((response) => {
  //       if (response) {
  //         this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
  //         this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
  //       }
  //     });
  // }

  // getRepartionByTaux(valueParamCession?:number) {

  //   if (!this.currentAffaire || !this.currentAffaire.affId) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucune affaire sélectionnée !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   let currentTauxSaisi = valueParamCession || this.itemToSave?.repTaux; //this.getFormFiledsValue('repTauxBesoinFac')?.value;
  //   if (!currentTauxSaisi || !currentTauxSaisi) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucun taux defini !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   if (currentTauxSaisi > 100) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Le taux ne doit pas être supérieur à 100 !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   this.businessOptionalRepartitionService
  //     .getRepartitionCalculatTaux(this.currentAffaire.affId, currentTauxSaisi,this.itemToSave.repId)
  //     .subscribe((response) => {
  //       if (response) {
  //         this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
  //         this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
  //       }
  //     });
  // }

  // getRepartionByTauxBesoinFac() {
  //   if (!this.currentAffaire || !this.currentAffaire.affId) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucune affaire sélectionnée !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   let currentTauxRepartionSaisi = this.itemToSave?.repTauxBesoinFac;
  //   if (!currentTauxRepartionSaisi || !currentTauxRepartionSaisi) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucun taux defini !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   if (currentTauxRepartionSaisi > 100) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Le taux ne doit pas être supérieur à 100 !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   this.businessOptionalRepartitionService
  //     .getRepartitionCalculatByTauxBesoin(
  //       this.currentAffaire.affId,
  //       currentTauxRepartionSaisi
  //     )
  //     .subscribe((response) => {
  //       if (response) {
  //         this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
  //         this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
  //       }
  //     });
  // }

  setValueAfterCalculateTauxOrCapital(
    itemRepartitionTaux: RepartitionByTauxOrCapital
  ) {
    this.itemToSave.besoinFacInitial = itemRepartitionTaux.besoinFac;
    this.itemToSave.repCapital = itemRepartitionTaux.capital;
    this.itemToSave.repTaux = itemRepartitionTaux.taux;
    this.itemToSave.repTauxBesoinFac = itemRepartitionTaux.tauxBesoinFac;
    this.getRepartitionCalculate(null,null);
  }

  //Recuperer les cession legale
  // getCessionLegale() {
  //   this.businessOptionalRepartitionService
  //     .getRepartitionCessionLegaleParam(this.currentAffaire.affId)
  //     .subscribe((response) => {

  //       this.listeCessionLegale = response as any;

  //       this.listeCessionLegale.forEach((cessionLegal: CessionLegale) => {
  //         this.listeParametreCessionsLegale.push(
  //           this.getValueFormCessionLegal(cessionLegal)
  //         );
  //       });

  //       this.getMatchCessionLegaleInUpdate();
  //     });
  // }

  // getOldDataRepartition() {
  //   this.businessOptionalRepartitionService
  //     .getOldDataRepartition(this.currentAffaire.affId)
  //     .subscribe((response : any) => {
  //       console.log(" getOldDataRepartition ", response);

  //       if(response && response?.repId) {
  //         this.oldDataRepartition = {...response};

  //         this.isUpdateRepartition = true;

  //         // Preselectionner les anciennes valeurs
  //         this.itemToSave.besoinFacInitial = response?.besoinFac || null;
  //         this.itemToSave.repCapital = response?.repCapital || null;
  //         this.itemToSave.repTaux = response?.repTaux || null;
  //         this.itemToSave.repTauxBesoinFac = response?.repTauxBesoinFac || response?.repTaux;
  //         this.itemToSave.repId = response?.repId;

  //         this.getMatchCessionLegaleInUpdate()
          
  //       }else{
  //         this.isUpdateRepartition = false;
  //       }
  //       // On recupere les elements à modifier ici
  //     });
  // }

  /** Repartition capital par cession legale */
  // getRepartionCessionByCapital(itemRepartition) {
  //   if (!this.currentAffaire || !this.currentAffaire.affId) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucune affaire sélectionnée !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   let currentCapitalSaisi = itemRepartition?.repCapital; //this.getFormFiledsValue('repCapital')?.value;
  //   if (!currentCapitalSaisi) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucun capital defini !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   this.businessOptionalRepartitionService
  //     .getRepartitionCalculatByCapital(
  //       this.currentAffaire.affId,
  //       currentCapitalSaisi,
  //       this.itemToSave.repId
  //     )
  //     .subscribe((response) => {
  //       if (response) {
  //         let resultRepartitionTaux = response as RepartitionByTauxOrCapital;
  //         itemRepartition.repTaux = resultRepartitionTaux?.taux;
  //       }
  //     });
  // }

  // getRepartionCessionByTaux(itemRepartition) {

  //   if (!this.currentAffaire || !this.currentAffaire.affId) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucune affaire sélectionnée !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   let currentTauxSaisi = itemRepartition?.repTaux; //this.getFormFiledsValue('repTauxBesoinFac')?.value;
  //   if (!currentTauxSaisi || !currentTauxSaisi) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Aucun taux defini !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   if (currentTauxSaisi > 100) {
  //     this.utilities.showNotification(
  //       "snackbar-danger",
  //       "Le taux ne doit pas être supérieur à 100 !",
  //       "bottom",
  //       "center"
  //     );
  //     return;
  //   }

  //   this.businessOptionalRepartitionService
  //     .getRepartitionCalculatTaux(this.currentAffaire.affId, currentTauxSaisi)
  //     .subscribe((response) => {
  //       if (response) {
  //         let resultRepartitionTaux  = response as RepartitionByTauxOrCapital;
  //         itemRepartition.repCapital = resultRepartitionTaux?.capital;
  //       }
  //     });
  // }

  /** Repartition calculate */
  getRepartionCalculate() {
    if (!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Aucune affaire sélectionnée !",
        "bottom",
        "center"
      );
      return;
    }

    this.busySave = this.businessOptionalRepartitionService
      .getRepartitionCalculateNew(
        this.currentAffaire.affId
      )
      .subscribe((response:any) => {
        if (response) {
          console.log(" response ",response);
          this.listeParametreCessionsLegale = [];
          this.repartitionTraiteItem = response as RepartitionTraiteeBesoinFac;

          this.isUpdateRepartition = this.repartitionTraiteItem.modeUpdate;
          if(response && response?.paramCesLegs) {
            this.listeCessionLegale = response?.paramCesLegs;
            this.listeCessionLegale.forEach((cessionLegal: CessionLegale) => {
              this.listeParametreCessionsLegale.push(
                this.getValueFormCessionLegal(cessionLegal)
              );
            });

            response?.paramCesLegsPremierFranc.forEach((cessionLegal: CessionLegale) => {
              this.listeCessionLegalePremierFranc.push(
                this.getValueFormCessionLegal(cessionLegal)
              );
            });
          }
       

          // let resultRepartitionTaux = response as RepartitionByTauxOrCapital;
          // itemRepartition.repTaux = resultRepartitionTaux?.taux;
        }
      });
  }

  getLastValueOfRepartition() {

    this.repartitionTraiteItem.paramCesLegs = this.listeParametreCessionsLegale;
    this.repartitionTraiteItem.paramCesLegsPremierFranc = this.listeCessionLegalePremierFranc;

   this.busySave = this.businessOptionalRepartitionService
      .getLastValueOfRepartition(this.repartitionTraiteItem)
      .subscribe((response:any) => {
        if (response) {
          console.log(" response ",response);
          this.listeParametreCessionsLegale = [];
          this.listeCessionLegalePremierFranc = [];
          this.repartitionTraiteItem = response as RepartitionTraiteeBesoinFac;

          this.isUpdateRepartition = this.repartitionTraiteItem.modeUpdate;
          if(response && response?.paramCesLegs) {
            this.listeCessionLegale = response?.paramCesLegs;
            this.listeCessionLegale.forEach((cessionLegal: CessionLegale) => {
              this.listeParametreCessionsLegale.push(
                this.getValueFormCessionLegal(cessionLegal)
              );
            });

            response?.paramCesLegsPremierFranc.forEach((cessionLegal: CessionLegale) => {
              this.listeCessionLegalePremierFranc.push(
                this.getValueFormCessionLegal(cessionLegal)
              );
            });
          }
       

          // let resultRepartitionTaux = response as RepartitionByTauxOrCapital;
          // itemRepartition.repTaux = resultRepartitionTaux?.taux;
        }
      });
  }

  ngOnInit(): void {
    // Initialisation du forms group

    this.currentAffaire = this.businessOptionalService.businessOptionalSubject$.value;

    // this.createForm();
    // this.getCouverture();
    // this.getCessionLegale();
    // this.getOldDataRepartition();
    this.getRepartionCalculate();
  }
}
