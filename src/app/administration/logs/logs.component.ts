import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Branche } from 'src/app/core/models/banche';
import { Country } from 'src/app/core/models/country';
import { BrancheService } from 'src/app/core/service/branche.service';
import { LogsService } from 'src/app/core/service/logs.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  
  items: Array<any> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  // user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  @Input() currentConnexion : any = {};

  constructor(private modalService: BsModalService, private utilities: UtilitiesService,
    private logService:LogsService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  getItems() {

    console.log(" this.currentConnexion ",this.currentConnexion);
    
    this.busyGet = this.logService.getLogsByConnexion((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),this.itemToSearch.userId || null,this.currentConnexion.connectionId || null)
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
    // this.getItems();
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(" changes ",changes);
    
    if (
      changes["currentConnexion"] &&
      changes["currentConnexion"].currentValue
    ) {
      this.getItems();
    }
  }


}
