import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { UserSynchroRE } from 'src/app/core/models/userSynscroRE';
import { LogsService } from 'src/app/core/service/logs.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-historique-connexion',
  templateUrl: './historique-connexion.component.html',
  styleUrls: ['./historique-connexion.component.scss']
})
export class HistoriqueConnexionComponent implements OnInit {

  
  items: Array<any> = [];
  ListeUsers : Array<UserSynchroRE> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  dateActuelle = new Date()

  constructor(private modalService: BsModalService, private utilities: UtilitiesService,
    private logService:LogsService,private userService : UserService) {
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

  onValueDateChange($event: any) {
   
    if ($event) {
      this.itemToSearch.dateDebut = moment($event[0]).format("YYYY-MM-DD");
      this.itemToSearch.dateFin = moment($event[1]).format("YYYY-MM-DD");
    }

    console.log(" this.itemToSearch ",this.itemToSearch);
    
    this.getItems();
  }

  
  getUsers() {
    this.userService.getByCriteria(0,1000)
      .subscribe(
        res => {
          if (res && res['content']) {
            this.ListeUsers = res['content'] as UserSynchroRE[];
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

  getItems() {
    this.busyGet = this.logService.getHistoryConnexion((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),(this.itemToSearch.userId || null),this.itemToSearch.dateDebut || null, this.itemToSearch.dateFin ||null)
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
    this.getUsers();
  }


}
