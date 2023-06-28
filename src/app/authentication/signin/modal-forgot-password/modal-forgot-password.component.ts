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
  selector: 'app-modal-forgot-password',
  templateUrl: './modal-forgot-password.component.html',
  styleUrls: ['./modal-forgot-password.component.scss']
})
export class ModalForgotPasswordComponent implements OnInit {

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
  title='reinitialiser mot de passe'
  listAssurances: any;
  constructor(public bsModalRef: BsModalRef,private authService: AuthService, private restClient: RestClientService,private modalService: BsModalService,private utilities: UtilitiesService,
    private userService: UserService) {
    this.user = this.authService.currentUserValue;
    
  }
  confirmSaveItem(item) {

    let objToSave = Object.assign({}, item);

    // if (!item || !item.email) {
    //   this.utilities.showNotification("snackbar-danger", "Veuillez renseiger email!",
    //     "bottom",
    //     "center");
    //   return;
    // }

    if (!item || !item.email) {
      this.utilities.showNotification("snackbar-danger", "Veuillez renseiger l'email!",
        "bottom",
        "center");
      return;
    }

    

    Swal.fire({
      title: "Reinitialiser mot de passe",
      text: "Vous êtes sur le point de reinitialiser votre compte. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#aaa4a4",
      confirmButtonText: "Oui",
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.saveItem(objToSave);
      }
    });
  }

  saveItem(item) {

    this.loading = true;
    
    this.busyGet = this.userService.sendEmailForReinitPassword(item.email, {})
      .subscribe(
        res => {
          console.log("resul", res);
          this.loading = false;

          this.utilities.showNotification(
            "snackbar-success",
            "Veuillez accéder à votre mail pour continuer l'opération !",
            "bottom",
            "center"
          );

          this.bsModalRef.hide();
          
        },
        err => {
          this.utilities.showNotification("snackbar-danger", this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center");
          this.loading = false;
        }
      );
  }

  ngOnInit(): void {
   
  }

}
