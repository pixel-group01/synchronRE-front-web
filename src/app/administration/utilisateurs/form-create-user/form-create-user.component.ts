import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Cedante } from 'src/app/core/models/cedante';
import { privilegeSynchroRE } from 'src/app/core/models/privilegeSynscroRE';
import { RoleSynchroRE } from 'src/app/core/models/roleSynscroRE';
import { UserSynchroRE } from 'src/app/core/models/userSynscroRE';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { PrivilegeService } from 'src/app/core/service/privilege.service';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.scss']
})
export class FormCreateUserComponent implements OnInit {

  userForm!: FormGroup;
  @Input() itemToUpdate: UserSynchroRE; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  listeCedente: Array<Cedante> = [];
  listeRoles: Array<RoleSynchroRE> = [];
  listePrivileges: Array<privilegeSynchroRE> = [];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  dateActuelle = new Date();

  typeUserForm : any = {
    createUserDTO: {
      email: null,
      tel: null,
      firstName: null,
      lastName: null,
      visibilityId: null,
      cesId: null
    },
    createInitialFncDTO: {
      name: "",
      startsAt: "",
      endsAt: "",
      roleIds: [],
      prvIds: []
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private cedenteService: CedanteService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService
  ) {}

  createForm = () => {

    this.userForm = this.formBuilder.group({
      userId: [this.itemToUpdate?.userId || ""],
      email: [this.itemToUpdate?.email || "", Validators.required],
      tel: [this.itemToUpdate?.tel || "", Validators.required],
      firstName: [this.itemToUpdate?.firstName || "", Validators.required],
      lastName: [this.itemToUpdate?.lastName || "", Validators.required],
      cedId: [this.itemToUpdate?.cedId || ""],
      typeUser: [this.itemToUpdate?.typeUser || ""],
      libelleFonction : [""],
      dateDebutFonction : [""],
      roles : [""],
      privileges : [""],
      dateFinFonction : [""],
      // visibilityId: [this.itemToUpdate?.visibilityId || "", Validators.required],
      // cesId: [this.itemToUpdate?.cesId || "", Validators.required]
    });
  };

  getFormFiledsValue = (field: string) => {
    return this.userForm.get(field);
  };

  confirmSaveItem() {

    console.log(" this.userForm.value ",this.userForm.value);
    
    Swal.fire({
      title: "Utilisateur",
      text: (this.itemToUpdate?.userId && this.itemToUpdate?.userId > 0)
        ? "Vous êtes sur le point de modifier un utilisateur. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer un utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(this.userForm.value);
      }
    });
  }

  saveItem(item: UserSynchroRE) {

    let itemAEnregistrer = Object.assign({}, item);

    let createUserDTO = {
      email: itemAEnregistrer.email,
      tel: itemAEnregistrer.tel,
      firstName: itemAEnregistrer.firstName,
      lastName: itemAEnregistrer.lastName,
      visibilityId: null,
      cesId: itemAEnregistrer.cesId,
      cedId : itemAEnregistrer.cedId
    };

    let initialFonctionDTO = {
      name: itemAEnregistrer.libelleFonction,
      startsAt: moment(itemAEnregistrer.dateDebutFonction).format("YYYY-MM-DD"),
      endsAt: moment(itemAEnregistrer.dateFinFonction).format("YYYY-MM-DD"),
      roleIds: itemAEnregistrer.roles,
      prvIds: itemAEnregistrer.privileges
    };

    let requestUser = {
      createInitialFncDTO : initialFonctionDTO,
      createUserDTO : createUserDTO
    }

    if (!itemAEnregistrer.userId) {

     
      // nous sommes au create
      this.busySuscription = this.userService.createUserWithFonction(requestUser).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.branId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.busySuscription = this.userService.update(requestUser).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.branId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    }
  }

  getCedente() {
    this.cedenteService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeCedente = response["content"] as Cedante[];
      } else {
        this.listeCedente = [];
      }
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

  getRoles() {
    this.roleService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeRoles = response["content"] as RoleSynchroRE[];
      } else {
        this.listeRoles = [];
      }
    });
  }

  closeModalUser(){
    this.closeModal.emit(true);
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getCedente();
    this.getPrivilege();
    this.getRoles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }


}
