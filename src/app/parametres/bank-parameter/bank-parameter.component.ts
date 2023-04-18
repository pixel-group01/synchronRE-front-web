import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { BankService } from 'src/app/core/service/bank.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-bank-parameter',
  templateUrl: './bank-parameter.component.html',
  styleUrls: ['./bank-parameter.component.scss']
})
export class BankParameterComponent implements OnInit {

  listItems: Array<any> = [];
  items: Array<any> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  busySave: Subscription;
  loading: boolean = false;
  endPoint : string = 'adminTypeVacation/';

  constructor(private authService: AuthService, private restClient: RestClientService, private modalService: BsModalService, private utilities: UtilitiesService,
    private bankService:BankService) {
    this.user = this.authService.currentUserValue;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  confirmSaveItem(item) {

    let objToSave = Object.assign({}, item);

    if (!item || !item.libelle) {
      this.utilities.showNotification("snackbar-danger", "Veuillez renseigner le libellé !",
        "bottom",
        "center");
      return;
    }

    objToSave.code = new Date().getTime();

    // if (!item.code) {
    //   this.utilities.showNotification("snackbar-danger", "Veuillez renseigner le code !",
    //     "bottom",
    //     "center");
    //   return;
    // }

    Swal.fire({
      title: "Type vacation",
      text: objToSave?.id ? "Vous êtes sur le point de modifier un type. Voulez-vous poursuivre cette action ?" : "Vous êtes sur le point d'enregistrer un type. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#aaa4a4",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        objToSave.libelle = objToSave.libelle.toUpperCase();
        this.saveItem(objToSave);
      }
    });
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

  saveItem(item) {

    this.loading = true;

    let itemAEnregistrer = Object.assign({}, item);

    var request = {
      user: this.user.id,
      datas: [
        itemAEnregistrer
      ]
    }

    this.busySave = this.restClient.post(this.endPoint+''+ (itemAEnregistrer.id ? 'update' : 'create'), request)
      .subscribe(
        res => {
          console.log("resul", res);
          this.loading = false;

          if (!res['hasError']) {
            if (res['items'] && res['items'].length > 0) {

              this.utilities.showNotification("snackbar-success",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");

              this.getItems();
              this.modalRef.hide();
            }
          } else {
            if (res['status'] && res['status']['message']) {
              this.utilities.showNotification("snackbar-danger",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");
            }
          }
        },
        err => {
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
          this.loading = false;
        }
      );
  }

  getItems() {
    console.log(" recuperation banque ");
    
    let request = {
      user: this.user?.id,
      data: {
        libelle: this.itemToSearch.libelle ? this.itemToSearch.libelle : null
      },
      index: (this.currentPage - 1),
      size: this.itemsPerPage
    }

    this.busyGet = this.bankService.getAllBank()
      .subscribe(
        res => {
          console.log(" res ",res);
          
          if (res && res['items']) {
            this.items = res['items'];
            this.totalItems = res['count'];
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

  confirmDelete(item){
    Swal.fire({
      title: "Type vacation",
      text: "Vous êtes sur le point de supprimer un type. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#aaa4a4",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.deleteItem(item);
      }
    });
  };

  closeModal($event : any){
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if($event) {
      this.getItems();
    }
  }

  deleteItem(obj) {

    var request = {
      user: this.user.id,
      datas: [
        {id : obj?.id}
      ]
    }

    this.busyGet = this.restClient.post(this.endPoint+'delete', request)
      .subscribe(
        res => {
          console.log(res);
          if (!res['hasError']) {
            this.utilities.showNotification("snackbar-success",
              this.utilities.formatMsgServeur(res['status']['message']),
              "bottom",
              "center");

            this.currentPage = 1;
            this.getItems();
          }
          else {
            if (res['status'] && res['status']['message']) {
              this.utilities.showNotification("snackbar-danger",
                this.utilities.formatMsgServeur(res['status']['message']),
                "bottom",
                "center");
            }
          }

        },
        err => {
          console.log("Error occured", err);
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
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
    this.getItems();
  }


}
