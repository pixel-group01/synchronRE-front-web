import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';

@Component({
  selector: 'app-teritorrilite',
  templateUrl: './teritorrilite.component.html',
  styleUrls: ['./teritorrilite.component.scss']
})
export class TeritorriliteComponent implements OnInit {
  itemToSearch :any = {}
  modalRef: BsModalRef;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  user: User;
  items : any;
  @Input() endPoint: string;
  
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
      this.endPoint +
      "?page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") +
      "" +
      (this.itemToSearch.exeCode
        ? "&exeCode=" + this.itemToSearch.exeCode
        : "");

    this.busyGet = this.restClient.get(endPointFinal).subscribe(
      (res) => {
        if (res && res["content"]) {
          this.items = res["content"];
          this.totalItems = res["totalElements"];
        } else {
          this.items = [];
          this.totalItems = 0;
        }
      },
      (err) => {}
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
      num = (page - 1) * 10 + (index + 1);
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
    this.getItems()
  }
}
