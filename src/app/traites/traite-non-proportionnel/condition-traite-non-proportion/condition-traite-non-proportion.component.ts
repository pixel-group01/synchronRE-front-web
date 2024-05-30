import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from "lodash";

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

  @Input() idTraitNonProChild: number;
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

  constructor() {
    }

    gotoPreviousStep() {
      this.stepperInice.emit(1);
    }

    fermerOpenData(ident : boolean){
      if (ident) {
        this.isCloseOpen = !ident
      }

    }

    ngOnInit(): void {
    }
  }