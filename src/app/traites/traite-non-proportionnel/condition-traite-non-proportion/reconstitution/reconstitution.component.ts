import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { User } from 'src/app/core/models/user';
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

@Component({
  selector: 'app-reconstitution',
  templateUrl: './reconstitution.component.html',
  styleUrls: ['./reconstitution.component.scss']
})
export class ReconstitutionComponent implements OnInit {
 
  items : any;
  modalRef: BsModalRef;
  itemToSearch :any = {}
  @Input() endPoint: string;
  @Input() idTraitNonProChildren: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private modalService: BsModalService,
    private restClient:RestClientService
  ) {} 

  openModal(template: TemplateRef<any>, itemAffaire?: BusinessOptional) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-30",
    };
    this.modalRef = this.modalService.show(template, config);
  }

  getItems() {
    let endPointFinal =
      this.endPoint +
      "?page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") +
      "" +
      (this.idTraitNonProChildren
        ? "&traiId=" + this.idTraitNonProChildren
        : "");

    this.busyGet = this.restClient.get(endPointFinal).subscribe(
   (res:any)=>{
        if (res && res["content"]) {
          this.items = res["content"];
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

  ngOnInit() {
  }
}