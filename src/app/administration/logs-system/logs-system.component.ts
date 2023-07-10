import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { LogsService } from 'src/app/core/service/logs.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-logs-system',
  templateUrl: './logs-system.component.html',
  styleUrls: ['./logs-system.component.scss']
})
export class LogsSystemComponent implements OnInit {

  
  items: Array<any> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;

  constructor(private modalService: BsModalService, private utilities: UtilitiesService,
    private logService:LogsService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  openModal(data: any, template: TemplateRef<any>) {

    let config = {backdrop: true, ignoreBackdropClick: true,class:  "gray modal-lg modal-width-65",};

    this.itemToSave = {};
    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = Object.assign({}, data);

      console.log(" this.itemToSave ",this.itemToSave);
      
    }

    this.modalRef = this.modalService.show(template,config);
  }

  getItems() {
    this.busyGet = this.logService.getLogsSystemError((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null))
      .subscribe(
        res => {
          if (res && res['content']) {
            this.items = res['content'] ;
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
