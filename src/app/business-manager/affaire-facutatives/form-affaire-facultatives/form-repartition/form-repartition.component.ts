import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalRepartition } from 'src/app/core/models/businessOptionalRepartition';
import { Cedante } from 'src/app/core/models/cedante';
import { CessionLegale } from 'src/app/core/models/cessionLegale';
import { Couverture } from 'src/app/core/models/couverture';
import { RepartitionByTauxOrCapital } from 'src/app/core/models/repartitionByTauxOrCapital';
import { RepartitionCedanteCessionLegal } from 'src/app/core/models/repartitionCedanteCessionLegal';
import { BusinessOptionalRepartitionService } from 'src/app/core/service/business-optional-repartition.service';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { CouvertureService } from 'src/app/core/service/couverture.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-repartition',
  templateUrl: './form-repartition.component.html',
  styleUrls: ['./form-repartition.component.scss']
})
export class FormRepartitionComponent implements OnInit {

  itemToSave : BusinessOptionalRepartition = {};
  formulaireGroup!: FormGroup;
  isUpdateRepartition : boolean = false;
  listeCouvertures : Array<Couverture> = [];
  listeCessionLegale: Array<CessionLegale> = [];
  currentAffaire : BusinessOptional;
  repartitionBesoinFac: RepartitionByTauxOrCapital;
  dateActuelle = new Date();
  @Input() itemToUpdate: BusinessOptionalRepartition; 
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private couvertureService: CouvertureService,
    private businessOptionalService: BusinessOptionalService,
    private businessOptionalRepartitionService: BusinessOptionalRepartitionService,
    private utilities: UtilitiesService
  ) {}


  getCouverture(){
    this.couvertureService.getAll().subscribe(
      (response) => {
        if (response && response['content']) {
          this.listeCouvertures = response['content'] as Couverture[];
        }
        else {
          this.listeCouvertures = [];
        }
      }
    )
  }

  createForm = () => {
    this.formulaireGroup = this.formBuilder.group({
      repId: [this.itemToUpdate?.affId || ""],
      repCapital: [this.itemToUpdate?.repCapital || ""],
      repTaux: [this.itemToUpdate?.repTaux || ""],
      repTauxBesoinFac: [this.itemToUpdate?.repTauxBesoinFac || ""],
      repSousCommission: [this.itemToUpdate?.repSousCommission || ""],
      repInterlocuteur: [this.itemToUpdate?.repInterlocuteur || ""],
      affId: [this.itemToUpdate?.affId || ""],
      // cesId: [this.itemToUpdate?.cesId || "", Validators.required],
      paramCesLegalId: [this.itemToUpdate?.paramCesLegalId || ""],
      typId: [this.itemToUpdate?.typId || ""],
      besoinFacInitial: [this.itemToUpdate?.besoinFacInitial || ""],
      repartitionCessionLegal: this.formBuilder.array([]),
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.formulaireGroup.get(field);
  };

  getFormCessionLegale() : FormArray {
    return this.formulaireGroup.get("repartitionCessionLegal") as FormArray
  }

  getFormCessionLegal(paramCession:CessionLegale) : FormGroup {
      return this.formBuilder.group({
        repCapital: paramCession.paramCesLegCapital,
        repTaux: paramCession.paramCesLegTaux,
        repTauxBesoinFac:'',
        repSousCommission : 0,
        affId:this.currentAffaire?.affId,
        paramCesLegalId: paramCession.paramCesLegId,
        paramCesLegLibelle : paramCession?.paramCesLegLibelle
      })
  }

  confirmSaveItem() {
    Swal.fire({
      title: "Répartition",
      text: (this.itemToUpdate?.repId && this.itemToUpdate?.repId > 0)
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
        let currentValueRepartion = {...this.formulaireGroup.value};
        let requestRepartition: RepartitionCedanteCessionLegal = {
          cesLegDtos : currentValueRepartion.repartitionCessionLegal,
          repCapital: currentValueRepartion.repCapital,
          repTauxBesoinFac: currentValueRepartion.repTauxBesoinFac,
          affId : this.currentAffaire?.affId,
          repTaux : currentValueRepartion.repTaux,
          repSousCommission : 0
        }
        this.saveItem(requestRepartition);
      }
    });
  }

  saveItem(item: RepartitionCedanteCessionLegal) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!this.isUpdateRepartition) {
      // nous sommes au create
      this.businessOptionalRepartitionService.createCedanteLegaleRepartition(itemAEnregistrer).subscribe((response : any) => {
        
        console.log(" response businessOptionalRepartitionService",response);
        
        if (response && response.repId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );

          this.stepperInice.emit(3);
        }
        // this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.businessOptionalRepartitionService.update(itemAEnregistrer).subscribe((response: any) => {
        if (response && response?.repId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull(),
            "bottom",
            "center"
          );

          if(!this.businessOptionalService.businessOptionalSubject$.value) {
            this.closeModal.emit(true);
          }else{
            this.stepperInice.emit(3);
          }

        }
      });
    }
  }

  gotoPreviousStep() {
    this.stepperInice.emit(1);
  }

  getRepartionByCapital() {

    if(!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification("snackbar-danger","Aucune affaire sélectionnée !","bottom","center");
      return
    }

    let currentCapitalSaisi = this.getFormFiledsValue('repCapital')?.value;
    if(!currentCapitalSaisi|| !currentCapitalSaisi) {
      this.utilities.showNotification("snackbar-danger","Aucun capital defini !","bottom","center");
      return
    }

    this.businessOptionalRepartitionService.getRepartitionCalculatByCapital(this.currentAffaire.affId,currentCapitalSaisi).subscribe(
      (response) => {
        if (response) {
          this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
          this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
        }
      }
    )
  }

  getRepartionByTaux() {

    if(!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification("snackbar-danger","Aucune affaire sélectionnée !","bottom","center");
      return
    }

    let currentTauxSaisi = this.getFormFiledsValue('repTauxBesoinFac')?.value;
    if(!currentTauxSaisi|| !currentTauxSaisi) {
      this.utilities.showNotification("snackbar-danger","Aucun taux defini !","bottom","center");
      return
    }

    if(currentTauxSaisi > 100) {
      this.utilities.showNotification("snackbar-danger","Le taux ne doit pas être supérieur à 100 !","bottom","center");
      return
    }

    this.businessOptionalRepartitionService.getRepartitionCalculatTaux(this.currentAffaire.affId,currentTauxSaisi).subscribe(
      (response) => {
        if (response) {
          this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
          this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
        }
      }
    )
  }

  getRepartionByTauxBesoinFac() {

    if(!this.currentAffaire || !this.currentAffaire.affId) {
      this.utilities.showNotification("snackbar-danger","Aucune affaire sélectionnée !","bottom","center");
      return
    }

    let currentTauxRepartionSaisi = this.getFormFiledsValue('repTauxBesoinFac')?.value;
    if(!currentTauxRepartionSaisi|| !currentTauxRepartionSaisi) {
      this.utilities.showNotification("snackbar-danger","Aucun taux defini !","bottom","center");
      return
    }

    if(currentTauxRepartionSaisi > 100) {
      this.utilities.showNotification("snackbar-danger","Le taux ne doit pas être supérieur à 100 !","bottom","center");
      return
    }

    this.businessOptionalRepartitionService.getRepartitionCalculatByTauxBesoin(this.currentAffaire.affId,currentTauxRepartionSaisi).subscribe(
      (response) => {
        if (response) {
          
          this.repartitionBesoinFac = response as RepartitionByTauxOrCapital;
          this.setValueAfterCalculateTauxOrCapital(this.repartitionBesoinFac);
        }
      }
    )
  }

  setValueAfterCalculateTauxOrCapital(itemRepartitionTaux : RepartitionByTauxOrCapital){
    this.formulaireGroup.patchValue({besoinFacInitial:itemRepartitionTaux.besoinFac});
    this.formulaireGroup.patchValue({repCapital:itemRepartitionTaux.capital});
    this.formulaireGroup.patchValue({repTaux:itemRepartitionTaux.taux});
    this.formulaireGroup.patchValue({repTauxBesoinFac:itemRepartitionTaux.tauxBesoinFac});
  }

  //Recuperer les cession legale
  getCessionLegale() {
    this.businessOptionalRepartitionService.getRepartitionCessionLegaleParam(this.currentAffaire.affId).subscribe(
      (response) => {
        console.log(" cession param ",response);
        this.listeCessionLegale = response as any;

        this.listeCessionLegale.forEach((cessionLegal : CessionLegale) => {
          this.getFormCessionLegale().push(this.getFormCessionLegal(cessionLegal));
        });

        console.log(" value repartition ",this.formulaireGroup.value);
        
      }
    )
  }


  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getCouverture();
  

    this.currentAffaire = {
      "affId": 6,
      "affCode": null,
      "affAssure": "noglo koffi",
      "affActivite": "REASSUREUR",
      "affDateEffet": "2023-04-25",
      "affDateEcheance": "2023-04-29",
      "facNumeroPolice": null,
      affCapitalInitial: 30000000,
      "facSmpLci": null,
      "facPrime": null,
      "cedenteId": 2,
      "cedNomFiliale": "NSIA BN",
      "cedSigleFiliale": "NSIA BN",
      "statutCode": "SAI",
      couvertureId: 1,
      restARepartir: 30000000,
      "capitalDejaReparti": 0,
      "etatComptable": null
  };

  this.getCessionLegale();
   //this.businessOptionalService.businessOptionalSubject$.value;
    console.log(" this.currentAffaire ",this.currentAffaire);
   
  }
}
