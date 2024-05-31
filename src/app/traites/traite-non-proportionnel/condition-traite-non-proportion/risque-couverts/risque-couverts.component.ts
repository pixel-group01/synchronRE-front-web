import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';

@Component({
  selector: 'app-risque-couverts',
  templateUrl: './risque-couverts.component.html',
  styleUrls: ['./risque-couverts.component.scss']
})
export class RisqueCouvertsComponent implements OnInit {

  items : any;
  modalRef: BsModalRef;
  itemToSearch :any = {}
  @Input() endPoint: string;
  @Input() idTraitNonProChildren: number;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  dataCurrent : any;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private modalService: BsModalService,
    private restClient:RestClientService
  ) {} 

  openModal(template: TemplateRef<any>, data?: any) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-30",
    };
    console.log('item terr ::', data);
    this.dataCurrent = data;
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

  changePaginationSize($event) {
    if($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  closeModal($event: any) {
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if ($event) {
      this.getItems();
    }
  }

  ngOnInit() {
    this.getItems();
  }
}