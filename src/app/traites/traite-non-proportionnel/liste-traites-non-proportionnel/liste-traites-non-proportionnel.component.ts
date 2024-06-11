import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Cedante } from 'src/app/core/models/cedante';
import { Exercice } from 'src/app/core/models/exercice';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { ExerciceService } from 'src/app/core/service/exercice.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { User } from "src/app/core/models/user";

@Component({
  selector: 'app-liste-traites-non-proportionnel',
  templateUrl: './liste-traites-non-proportionnel.component.html',
  styleUrls: ['./liste-traites-non-proportionnel.component.scss']
})
export class ListeTraitesNonProportionnelComponent implements OnInit {
  items: Array<BusinessOptional> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number;
  busyGet: Subscription;
  user: User;
   
  @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  @Input() noPutAction: boolean = false;
  @Input() isOngletReversement: boolean = false;
  @Input() isOngletPaiement: boolean = false;

  @Input() endPoint: string;
   
  initialEndPoint: string;
  // statutAffEnum: any;
  NumeroStepParent :  number;
  constructor(
    private businessOptionalService: BusinessOptionalService,
    private userService: UserService,
    private modalService: BsModalService,
    private restClient:RestClientService
  ) {
    this.user = this.userService.getCurrentUserInfo();
    // this.statutAffEnum = enumStatutAffaire;

    // if (this.user.cedId) {
    //   this.itemToSearch.cedenteId = this.user.cedId;
    // }
  }

  openModal(template: TemplateRef<any>, itemTraiterNonPro: any, numberStep?:number) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-65",
    };
    // if (itemAffaire) {
      this.itemToSave = { ...itemTraiterNonPro };
      if (numberStep) {
        this.NumeroStepParent = numberStep  
      }
    //   this.businessOptionalService.setCurrentOptionalBusiness(itemAffaire);
    // }
    this.modalRef = this.modalService.show(template, config);
  }

  closeFormModal($event) {
    this.modalRef.hide();
    this.businessOptionalService.setCurrentOptionalBusiness(null);
    this.getItems();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems();
  }

  getItems() {
    let endPointFinal =
      this.endPoint
       +
      "?page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "")

    // if (endPointFinal && this.itemToSearch.cedenteId) {
    //   endPointFinal = endPointFinal + "&cedId=" + this.itemToSearch.cedenteId;
    // }

    this.busyGet = this.restClient.get(endPointFinal).subscribe(  
      (res:any)=>{
        if (res && res["content"]) {
          this.items = res["content"] as BusinessOptional[];
          this.totalItems = res["totalElements"];
        } else {
          this.items = [];
          this.totalItems = 0;
        }
      }
     
    );
  }

  closeModal($event: any) {
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if ($event) {
      this.getItems();
    }
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * this.itemsPerPage + (index + 1);
    }
    return num;
  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["refreshDataTable"] &&
      changes["refreshDataTable"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.currentPage = 1;
      this.getItems();
    }
  }

  ngOnInit() {
    this.getItems();
  }
}
