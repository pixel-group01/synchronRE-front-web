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
  listeFonctions : any = [];

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

    if(!this.listeFonctions || this.listeFonctions.length == 0) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner les différentes fonctions de l'utilisateur !",
        "bottom",
        "center"
      );

      return;
    }

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
      visibilityId: itemAEnregistrer.cedId,
      cesId: itemAEnregistrer.cesId,
      cedId : itemAEnregistrer.cedId
    };

    // let initialFonctionDTO = {
    //   name: itemAEnregistrer.libelleFonction,
    //   startsAt: moment(itemAEnregistrer.dateDebutFonction).format("YYYY-MM-DD"),
    //   endsAt: moment(itemAEnregistrer.dateFinFonction).format("YYYY-MM-DD"),
    //   roleIds: itemAEnregistrer.roles,
    //   prvIds: itemAEnregistrer.privileges
    // };

    let requestUser = {
      createInitialFncDTO : this.listeFonctions,
      createUserDTO : createUserDTO
    }

    if (!itemAEnregistrer.userId) {
     
      // nous sommes au create
      this.busySuscription = this.userService.createUserWithFonction(requestUser).subscribe((response : any) => {
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
    } else {
      // Nous sommes en modification
      this.busySuscription = this.userService.update(requestUser).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.branId) {
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

  closeModalUser(){
    this.closeModal.emit(true);
  }

  addFonction(){
    let itemFonction = this.userForm.value;

    if(!itemFonction.libelleFonction) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner le libellé de la fonction !",
        "bottom",
        "center"
      );
    }

    let initialFonctionDTO = {
      name: itemFonction.libelleFonction,
      startsAt: itemFonction.dateDebutFonction ? moment(itemFonction.dateDebutFonction).format("YYYY-MM-DD") : null,
      endsAt: itemFonction.dateFinFonction ? moment(itemFonction.dateFinFonction).format("YYYY-MM-DD") : null,
      roleIds: itemFonction.roles,
      prvIds: itemFonction.privileges
    };

    this.listeFonctions.push(initialFonctionDTO);

    this.userForm.get("libelleFonction").setValue("");
    this.userForm.get("dateDebutFonction").setValue(null);
    this.userForm.get("dateFinFonction").setValue(null);
    this.userForm.get("roles").setValue([]);
    this.userForm.get("privileges").setValue([]);
    
  }

  deleteFonction(indice) {

    Swal.fire({
      title: "Suppression de fonction",
      text: "Voulez-vous supprimer cette fonction ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.listeFonctions.splice(indice,1);
      }
    });

   
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
