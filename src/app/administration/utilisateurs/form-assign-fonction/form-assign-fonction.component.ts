import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Cedante } from 'src/app/core/models/cedante';
import { privilegeSynchroRE } from 'src/app/core/models/privilegeSynscroRE';
import { RoleSynchroRE } from 'src/app/core/models/roleSynscroRE';
import { UserSynchroRE } from 'src/app/core/models/userSynscroRE';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { FonctionService } from 'src/app/core/service/fonction.service';
import { PrivilegeService } from 'src/app/core/service/privilege.service';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';
import * as _ from "lodash";
import { enumStatutFonction } from 'src/app/core/enumerator/enumerator';

@Component({
  selector: 'app-form-assign-fonction',
  templateUrl: './form-assign-fonction.component.html',
  styleUrls: ['./form-assign-fonction.component.scss']
})
export class FormAssignFonctionComponent implements OnInit {

 
  userForm!: FormGroup;
  @Input() itemToUpdate: UserSynchroRE; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  listeCedente: Array<Cedante> = [];
  listeRoles: Array<RoleSynchroRE> = [];
  listePrivileges: Array<privilegeSynchroRE> = [];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  dateActuelle = new Date();
  currentFonction : any = {};
  listeFonctionByUser : any = [];
  statutFonction : any = {};

  constructor(
    private formBuilder: FormBuilder,
    private cedenteService: CedanteService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private fonctionService: FonctionService
  ) {
    this.statutFonction = enumStatutFonction;
  }

  createForm = () => {

    // Conversion des dates
    if(this.currentFonction.endsAt) {
      let tabsDateEnd = this.currentFonction.endsAt.split("-");
      this.currentFonction.endsAt = new Date(tabsDateEnd[0],tabsDateEnd[1]-1,tabsDateEnd[2]);
    }

    if(this.currentFonction.startsAt) {
      let tabsDateStart = this.currentFonction.startsAt.split("-");
      this.currentFonction.startsAt = new Date(tabsDateStart[0],tabsDateStart[1]-1,tabsDateStart[2]);
    }

    // Recuperer les roles par defaut à cocher
    let oldRole = [];
    if(this.currentFonction.roles){
      console.log(" this.currentFonction.roles ",this.currentFonction.roles);
      this.currentFonction.roles.forEach(role => {
        // Verifier dans la liste de roles et recuperer le item concerner
        let itemFctSelected = _.find(this.listeRoles, {'roleId': role.roleId});
        oldRole.push(itemFctSelected.roleId);
      });
    }

    let oldPrivilege = [];
    if(this.currentFonction.privileges){
      this.currentFonction.privileges.forEach(role => {
        // Verifier dans la liste de roles et recuperer le item concerner
        let itemFctSelected = _.find(this.listePrivileges, {'privilegeId': role.privilegeId});
        oldPrivilege.push(itemFctSelected.privilegeId);
      });
    }

      this.userForm = this.formBuilder.group({
        userId: [this.itemToUpdate?.userId || ""],
        fncId: [this.currentFonction?.id || ""],
        visibilityId:[this.currentFonction?.visibilityId],
        libelleFonction : [this.currentFonction?.name],
        dateDebutFonction : [this.currentFonction?.startsAt],
        roles : [oldRole],
        privileges : [oldPrivilege],
        dateFinFonction : [this.currentFonction?.endsAt]
      });

  };

  getFormFiledsValue = (field: string) => {
    return this.userForm.get(field);
  };


  confirmRevokeFonction(fonction){
    Swal.fire({
      title: "Retirer une fonction",
      text: "Vous êtes sur le point de rétirer cette fonction à l'utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.revokeFocntion(fonction);
      }
    });
  }

  revokeFocntion(item) {

    // nous sommes au create
    this.busySuscription = this.fonctionService.revoke(item.id).subscribe((response : any) => {
      console.log(" response ", response);
      if (response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
      }
      this.getDetailsFonction();
    });
    
  }


  confirmSaveItem() {

    Swal.fire({
      title: "Utilisateur",
      text: "Vous êtes sur le point de modifier la fonction de l'utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {

        let assignFctValue = this.userForm.value;

        if(assignFctValue) {
          if(!assignFctValue.roles || assignFctValue.roles.length === 0){
            this.utilities.showNotification(
              "snackbar-danger",
              "Veuillez sélectionner les rôles !",
              "bottom",
              "center"
            );
            return;
          }

          if(!assignFctValue.privileges || assignFctValue.privileges.length === 0){
            this.utilities.showNotification(
              "snackbar-danger",
              "Veuillez sélectionner les privilèges !",
              "bottom",
              "center"
            );
            return;
          }
        }
        this.saveItem(this.userForm.value);
      }
    });
  }

  saveItem(item: UserSynchroRE) {

    let itemAEnregistrer = Object.assign({}, item);

    let initialFonctionDTO = {
      name: itemAEnregistrer.libelleFonction,
      fncId: this.currentFonction?.id,
      userId: this.itemToUpdate.userId,
      startsAt: moment(itemAEnregistrer.dateDebutFonction).format("YYYY-MM-DD"),
      endsAt: moment(itemAEnregistrer.dateFinFonction).format("YYYY-MM-DD"),
      roleIds: itemAEnregistrer.roles,
      prvIds: itemAEnregistrer.privileges
    };

    // nous sommes au create
    this.busySuscription = this.fonctionService.update(initialFonctionDTO).subscribe((response : any) => {
      console.log(" response ", response);
      if (response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
      }
      this.closeModal.emit(true);
    });
    
  }

  getPrivilege() {
    this.privilegeService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listePrivileges = response["content"] as privilegeSynchroRE[];
      } else {
        this.listePrivileges = [];
      }
    });
  }

   // recuperer les privileges d'un role
   getPrivilegeByRole(){
    let rolesId = this.userForm.value.roles;

    this.busySuscription = this.privilegeService.getPrivilegeByRoleIds(rolesId).subscribe(
      (response :any) => {
        console.log(" response busy ",response);
        if(response) {
          // this.checkedPrivilegeDefauft(response);
          let idsPrivileges = [];

          response.forEach(prv => {
            idsPrivileges.push(prv.privilegeId);
          });
          this.userForm.get("privileges").setValue(idsPrivileges);
        }
      }
    )
  }

  getRoles() {
    this.roleService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeRoles = response["content"] as RoleSynchroRE[];
      } else {
        this.listeRoles = [];
      }
    });
  }

  getDetailsFonction() {
    this.fonctionService.getDetailsInfoFonctionForUser(this.itemToUpdate?.userId).subscribe((response: any) => {
      if(response) {
        this.listeFonctionByUser = response;
      }
    });
  }

  gotoUpdateFonction(currentFonction){
    this.currentFonction = {...currentFonction};
    this.createForm();

    // console.log(" currentFonction ",currentFonction);
    // this.userForm.get("privileges").setValue(currentFonction.privileges);
    // this.userForm.get("roles").setValue(currentFonction.roles);
  }

  closeModalUser(){
    this.closeModal.emit(true);
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getPrivilege();
    this.getRoles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
      this.getDetailsFonction();
    }
  }

}
