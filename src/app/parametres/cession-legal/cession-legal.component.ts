import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { CessionLegale } from 'src/app/core/models/cessionLegale';
import { CessionLegaleService } from 'src/app/core/service/cession-legale.service';

@Component({
  selector: 'app-cession-legal',
  templateUrl: './cession-legal.component.html',
  styleUrls: ['./cession-legal.component.scss']
})
export class CessionLegalComponent implements OnInit {

  items: Array<CessionLegale> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  // user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;

  constructor(private modalService: BsModalService, private cessionLegalService:CessionLegaleService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  openModal(data: any, template: TemplateRef<any>) {

    let config = {backdrop: true, ignoreBackdropClick: true};

    this.itemToSave = {};
    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = Object.assign({}, data);
    }

    this.modalRef = this.modalService.show(template,config);
  }

  getItems() {
    this.busyGet = this.cessionLegalService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null))
      .subscribe(
        res => {
          if (res && res['content']) {
            this.items = res['content'] as CessionLegale[];
            this.totalItems = res['totalElements'];
          }
          else {
            this.items = [];
            this.totalItems = 0;
          }
        },
        err => {
        }
      );
  }

  closeModal($event : any){
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if($event) {
      this.getItems();
    }
  }

  getExactlyNumberRow(page,index)
  {
      let num = index +1;
      if(page>1)
      {
          num = ((page - 1) * 10) + (index+1);
      }
      return num;
  }
  
  changePaginationSize($event) {
    if($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  ngOnInit() {
    this.getItems();
  }


}
