import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/service/user.service";
import { BusinessOptionalService } from "../../core/service/business-optional.service";
import { Subscription } from "rxjs";
import { Exercice } from "../../core/models/exercice";
import { Cedante } from "../../core/models/cedante";
import { CedanteService } from "../../core/service/cedante.service";
import { ExerciceService } from "../../core/service/exercice.service";
var Highcharts = require("highcharts");
import * as _ from "lodash";
import { enumStatutAffaire } from "../../core/enumerator/enumerator";

@Component({
  selector: 'app-dashbord-affaire-facultative',
  templateUrl: './dashbord-affaire-facultative.component.html',
  styleUrls: ['./dashbord-affaire-facultative.component.scss']
})
export class DashbordAffaireFacultativeComponent implements OnInit {

  modalRef: BsModalRef;
  user: User;
  busyGet: Subscription;
  listeExercices: Array<Exercice> = [];
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  itemStatistique : any = {};
  constructor(
    private userService: UserService,
  ) {
    this.user = this.userService.getCurrentUserInfo();
  }

  ngOnInit(): void {}

}
