import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalRepartition, RepartitionTraiteeBesoinFac, CalculateRelartitionRequest } from 'src/app/core/models/businessOptionalRepartition';
import { CessionLegale } from 'src/app/core/models/cessionLegale';
import { Couverture } from 'src/app/core/models/couverture';
import { RepartitionByTauxOrCapital } from 'src/app/core/models/repartitionByTauxOrCapital';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalRepartitionService } from 'src/app/core/service/business-optional-repartition.service';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CouvertureService } from 'src/app/core/service/couverture.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';
import * as _ from "lodash";

@Component({
  selector: 'app-condition-traite-non-proportion',
  templateUrl: './condition-traite-non-proportion.component.html',
  styleUrls: ['./condition-traite-non-proportion.component.scss']
})
export class ConditionTraiteNonProportionComponent implements OnInit {
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
        this.saveItem(this.repartitionTraiteItem);
      }
    });
  }

  saveItem(item: RepartitionTraiteeBesoinFac) {
    this.stepperInice.emit(3);
    return
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

  }

  gotoPreviousStep() {
    this.stepperInice.emit(1);
  }


  setValueAfterCalculateTauxOrCapital(
    itemRepartitionTaux: RepartitionByTauxOrCapital
  ) {
    this.itemToSave.besoinFacInitial = itemRepartitionTaux.besoinFac;
    this.itemToSave.repCapital = itemRepartitionTaux.capital;
    this.itemToSave.repTaux = itemRepartitionTaux.taux;
    this.itemToSave.repTauxBesoinFac = itemRepartitionTaux.tauxBesoinFac;
    this.getRepartitionCalculate(null,null);
  }

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
    // this.getRepartionCalculate();

}
}