import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from "lodash";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-condition-traite-non-proportion',
  templateUrl: './condition-traite-non-proportion.component.html',
  styleUrls: ['./condition-traite-non-proportion.component.scss']
})
export class ConditionTraiteNonProportionComponent implements OnInit {
  // itemToSave: BusinessOptionalRepartition = {};

  
  // @Input() itemToUpdate: BusinessOptionalRepartition;

  @Input() isWizardProcess: boolean = false;
  @Input() isUpdateRepartition: boolean = false;
  @Input() currentTraiterNonPropoChild: any;

  @Input() idTraitNonProChild: number ;
  isCloseOpen :boolean =false;
  isCloseOpenRisque :boolean =false;
  isCloseOpenCateg :boolean =false;
  isCloseOpenAssiettePrime :boolean =false;
  isCloseOpenTranche :boolean =false;
  isCloseOpenLimitSous :boolean =false;
  isCloseOpenSousLim :boolean =false;
  isCloseOpenRecon :boolean =false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();
  @Output() idTraitNonPropor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

    gotoPreviousStep() {
      this.stepperInice.emit(1);
      // console.log("idTraitNonProChild ::", this.idTraitNonProChild);
      this.idTraitNonPropor.emit(this.idTraitNonProChild);
    }

    confirmSaveItem(){
      Swal.fire({
        title: "Enregistrement",
        text: "Vous êtes sur le point d'aller au suivant. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          // On effectue l'enregistrement
          this.suivant();
        }
      });
  }

    suivant(){
      this.stepperInice.emit(3);
    }

    fermerOpenData(ident : boolean){
      if (ident) {
        this.isCloseOpen = !ident
      }

    }

    ngOnInit(): void {
    }
  }