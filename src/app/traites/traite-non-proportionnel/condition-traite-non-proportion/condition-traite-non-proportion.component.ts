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