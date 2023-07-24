import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from "sweetalert2";
import * as _ from "lodash";
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.scss']
})
export class ModalUpdatePasswordComponent implements OnInit {

  itemToSave : any = {};
  busyGet: Subscription;
  busySave: Subscription;
  listTypeAntecedent : Array<any> = [];
  listAntecedentToSave : any= [];
  user : any = {};
  loading : boolean;
  currentData: any;
  currentDossier: any;
  dossierId: any;
  modalRef?: BsModalRef;
  title='Modifier mot de passe'
  listAssurances: any;
  confirmnewPassword:any;
  constructor(public bsModalRef: BsModalRef,private authService: AuthService, private restClient: RestClientService,private modalService: BsModalService,private utilities: UtilitiesService,private userService: UserService) {
    this.user = this.userService.getCurrentUserInfo();

    console.log(" this.user ",this.user);
    
    setTimeout(() => {
      console.log('here');
      
      if (this.currentData) {
        this.itemToSave.login = Object.assign({}, this.user).email;
        
      }
    }, 300);

    
  }


  

  confirmSaveItem(item) {

    let objToSave = Object.assign({}, item);

    if (!item || !this.user.email) {
      this.utilities.showNotification("snackbar-danger", "Veuillez renseiger login!",
        "bottom",
        "center");
      return;
    }

    if (!item || !item.password) {
      this.utilities.showNotification("snackbar-danger", "Veuillez renseiger ancien mot de passe!",
        "bottom",
        "center");
      return;
    }

    if (!item || !item.newPassword) {
      this.utilities.showNotification("snackbar-danger", "Veuillez renseiger nouveau mot de passe!",
        "bottom",
        "center");
      return;
    }
    if (item.newPassword != this.confirmnewPassword) {
      this.utilities.showNotification("snackbar-danger", "Mots de passe non identiques!",
        "bottom",
        "center");
      return;
    }
    Swal.fire({
      title: "Modidifier mot de passe",
      text: "Vous êtes sur le point de modifier votre mot de passe. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#aaa4a4",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        objToSave.login = this.user?.email;
        this.saveItem(objToSave);
      }
    });
  }

  saveItem(item) {

    this.loading = true;

    let itemAEnregistrer = Object.assign({}, item);

    var request = {
        "userId": this.user?.userId,
        "email": this.user?.email,
        "oldPassword": this.itemToSave.password,
        "newPassword": this.itemToSave.newPassword,
        "confirmPassword": this.confirmnewPassword
    }
    
    this.busyGet = this.userService.changePassword(request)
      .subscribe(
        res => {
          console.log("resul", res);
          this.loading = false;

          if(res) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.itemToSave = {};
            this.bsModalRef.hide()
          }

        },
        err => {
          this.loading = false;
          // this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
          //   "bottom",
          //   "center");
          // this.loading = false;
        }
      );
  }

  ngOnInit(): void {
   
  }

}
