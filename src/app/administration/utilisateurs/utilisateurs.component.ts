import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/service/auth.service";
import { RestClientService } from "src/app/core/service/rest-client.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as _ from "lodash";
import { UserService } from "src/app/core/service/user.service";
import { UserSynchroRE } from "src/app/core/models/userSynscroRE";
import { FonctionService } from "src/app/core/service/fonction.service";
import { User } from "src/app/core/models/user";

@Component({
  selector: "app-utilisateurs",
  templateUrl: "./utilisateurs.component.html",
  styleUrls: ["./utilisateurs.component.scss"],
})
export class UtilisateursComponent implements OnInit {
  listItems: Array<any> = [];
  detailsFonctionUser : any;
  items: Array<any> = [];
  itemToSave: any = {};
  uniteFonctionnelleSelected: any = {};
  modalRef: BsModalRef;
  user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  busySave: Subscription;
  loading: boolean = false;
  endPoint: string = "user/";
  itemsRole: any;
  itemsSpecialites: any;
  dateNais: any;
  bsValue: Date;
  imageName: string;
  imageDisplay: any;
  currentItemImage: {
    fileBase64: any;
    fileName: any;
    extension: any;
    typeDocument: string;
  };
  itemsUniteFonctionnelle: any;
  selectedUniteFoncId: any;
  selectedSpecialiteId: any;
  listSelectedUniteFonctionnelle = [];
  maxDate = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth() - 1,
    new Date().getDay()
  );
  constructor(
    private authService: AuthService,
    private restClient: RestClientService,
    private modalService: BsModalService,
    private utilities: UtilitiesService,
    private userService: UserService,
    private fonctionService: FonctionService
  ) {
    this.user = this.authService.currentUserValue;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems(); 
  }

  openModal(data: any, template: TemplateRef<any>,isDetails?:boolean) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      id: 1,
      // class: "modal-lg",
      class: isDetails ? "gray modal-md" : "gray modal-lg modal-width-65",
    };
    this.itemToSave = {};
    if (data) {
      this.itemToSave = Object.assign({}, data);

      if(isDetails) {
        this.getDetailsFonction(this.itemToSave);
      }
    }
    this.modalRef = this.modalService.show(template, config);
  }


  getItems() {
    this.busyGet = this.userService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null))
      .subscribe(
        res => {
          if (res && res['content']) {
            this.items = res['content'] as UserSynchroRE[];
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

  confirmUnLockAccount(item) {
    Swal.fire({
      title: "Activation de compte d'un utilisateur",
      text: "Vous êtes sur le point d'activer cet utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.unLockAccount(item);
      }
    });
  }

  confirmLockAccount(userId) {
    Swal.fire({
      title: "Vérrouillage de compte d'un utilisateur",
      text: "Vous êtes sur le point de verrouiller cet utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.lockAccount(userId);
      }
    });
  }

  lockAccount(idUser:any) {

    this.busyGet = this.userService.lockAccount(idUser)
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.getItems();
          }
        },
        (err) => {
          console.log("Error occured", err);
          this.utilities.showNotification(
            "snackbar-danger",
            this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center"
          );
          this.getItems();
        }
      );
  }


  unLockAccount(idUser:any) {
    this.busyGet = this.userService.unLockAccount(idUser)
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
          }
        },
        (err) => {
          console.log("Error occured", err);
          this.utilities.showNotification(
            "snackbar-danger",
            this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center"
          );
        }
      );
  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  closeModalFormUser($event:any){
    if($event) {
      this.getItems();
    }
    this.modalRef.hide();
  }


  getDetailsFonction(itemUser : User) {
    this.fonctionService.getDetailsInfoFonctionForUser(itemUser?.userId).subscribe((response: any) => {
      if(response) {
        console.log(" response ",response);
        this.detailsFonctionUser = response;
      }
    });
  }


  ngOnInit() {
    this.getItems();
  }
}
