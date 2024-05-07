import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { Cessionnaire } from "src/app/core/models/cessionnaire";
import { RepartitionByTauxOrCapital } from "src/app/core/models/repartitionByTauxOrCapital";
import { RepartitionPlacement } from "src/app/core/models/repartitionPlacement";
import { BusinessOptionalRepartitionService } from "src/app/core/service/business-optional-repartition.service";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { CessionnaireService } from "src/app/core/service/cessionnaire.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as _ from "lodash";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/service/user.service";
import { InterlocuteurService } from "src/app/core/service/interlocuteur.service";
import { Interlocuteur } from "src/app/core/models/interlocuteur";

@Component({
  selector: "app-form-placement",
  templateUrl: "./form-placement.component.html",
  styleUrls: ["./form-placement.component.scss"],
})
export class FormPlacementComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();

  itemToSave: RepartitionPlacement = new RepartitionPlacement();
  listeCessionnaire: Cessionnaire[];
  listeRepartitions: any = [];
  listePlacementValides : any = [];
  itemToUpdate: any;
  currentAffaire: BusinessOptional;
  busySave: Subscription;
  refreshData:string;
  refreshDataInterlocuteur : string;
  idsInterlocuteurs : any = [];
  idInterlocuteurPrincipale : number;
  listeInterlocuteursPlacements : Interlocuteur[] = [];

  @Input() isWizardProcess:boolean = false;
  @Input() isDetails:boolean = false;
  @Input() isUpdatePlacement:boolean = false;
  @Input() isValidationPlacement:boolean = false;

  currentUser : User;
  listeHistoriquePlacement : any = [];
  
  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUserInfo();
  }

  ngOnInit(): void {
  }
}
