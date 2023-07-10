import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { UserSynchroRE } from 'src/app/core/models/userSynscroRE';
import { LogsService } from 'src/app/core/service/logs.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";
import * as _ from "lodash";

@Component({
  selector: 'app-logs-system',
  templateUrl: './logs-system.component.html',
  styleUrls: ['./logs-system.component.scss']
})
export class LogsSystemComponent implements OnInit {

  
  items: Array<any> = [];
  ListeUsers : Array<UserSynchroRE> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  dateActuelle = new Date();
  errorsIds : string;

  constructor(private modalService: BsModalService, private utilities: UtilitiesService,
    private logService:LogsService,private userService : UserService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  onValueDateChange($event: any) {
   
    if ($event) {
      this.itemToSearch.dateDebut = moment($event[0]).format("YYYY-MM-DD");
      this.itemToSearch.dateFin = moment($event[1]).format("YYYY-MM-DD");
    }

    console.log(" this.itemToSearch ",this.itemToSearch);
    
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

    this.busyGet = this.logService.getLogsSystemError((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),(this.itemToSearch.userId || null),this.itemToSearch.dateDebut || null,this.itemToSearch.dateDebut || null)
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

  confirmDeleteSingleLog(item){
    
    Swal.fire({
      title: "Suppression",
      text: "Vous êtes sur le point de supprimer un log. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
          this.errorsIds = "errorIds="+item?.id;
      }
    });
  }

  confirmDeleteManyLogs(){
    
    /** On recupere les items cochés */
    let itemLogsChecked = [];
    if(this.items) {
      itemLogsChecked = _.filter(this.items, (o) => { return o.checked; });

      if(!itemLogsChecked || itemLogsChecked.length == 0) {
        this.utilities.showNotification(  "snackbar-danger",
        "Veuillez cocher les lignes à supprimer",
        "bottom",
        "center");
        return;
      }
    }

    Swal.fire({
      title: "Suppression",
      text: "Vous êtes sur le point de supprimer des logs. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
         itemLogsChecked.forEach((key,item  :any) => {
          this.errorsIds = this.errorsIds+""+( key == 0 ? (this.errorsIds+"errorIds="+item?.id) : ("&errorIds="+item?.id));
         });
         this.deleteLogs();
      }
    });
  }


  deleteLogs() {
    this.busyGet = this.logService
    .deleteSystemError(this.errorsIds)
    .subscribe((response: any) => {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
        this.getItems();
    });
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
