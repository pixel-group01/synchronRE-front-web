import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/service/auth.service";
import { RestClientService } from "src/app/core/service/rest-client.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as _ from "lodash";
import { privilegeSynchroRE } from "src/app/core/models/privilegeSynscroRE";
import { RoleSynchroRE } from "src/app/core/models/roleSynscroRE";
import { PrivilegeService } from "src/app/core/service/privilege.service";
import { RoleService } from "src/app/core/service/role.service";
import { Role } from "src/app/core/models/role";
import { PrivilegeRessource } from "src/app/core/models/privilegeRessource";
import { Privilege } from "src/app/core/models/privilege";
@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {

  maxDate = new Date();

  itemToSave: any = {};
  itemToSearch: any = {};
  result: any;
  page = 4;
  config: any;
  public maxSize: number = 7;

  listePrivileges: Array<privilegeSynchroRE> = [];
  listeRoles: Array<RoleSynchroRE> = [];

  listeFctByParentId : any = [];
  ListRoles: any[];
  ListProfile: any;
  listFonctionalitesHierachises: any = [];
  isAllParentChecked : boolean = false;
  selectedRow: any;
  busyGet: Subscription;
  modalRef: any;
  ListFonctionnalites: any;
  listItems: Array<any> = [];
  items: Array<any> = [];
  user: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busySave: Subscription;
  loading: boolean = false;
  itemsRole: any;

  constructor(
    private authService: AuthService,
    private restClient: RestClientService,
    private modalService: BsModalService,
    private utilities: UtilitiesService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.getDataFonctionnalites();
    setTimeout(() => {
      this.getItems();
    }, 200);
  }

  displayDetails(item) {
    item.isOpen = !item.isOpen;
  }

  /** Gestion du coché tous */
  setCheckedAllItem() {
   
    _.forEach(this.listePrivileges, (fct) => {
      fct.isChecked = this.itemToSave.isAllFct || false;
      fct.indeterminate = false;
      if(fct.privileges && fct.privileges.length > 0) {
        _.forEach(fct.privileges, (privilege) => {
          privilege.isChecked = this.itemToSave.isAllFct || false;
        });
      }
    });
  }

  setCheckedItem(valeur, type, listFct,parentFct : any) {

    if (type == "parent") {
      _.forEach(listFct, function (value, key) {
        
          value.isChecked = valeur;

          if (value.privileges) {
              _.forEach(value.privileges, function (valueChild, keyChild) {
                  valueChild.isChecked = valeur;

                  _.forEach(valueChild.privileges, function (valueChildSecond, keyChild) {
                      valueChildSecond.isChecked = valeur;
                  });

              });
          }
      });
    }

    if(type == "simple") {
     // Verifier si tout les enfants sont cochés
     let fctCheckeds = _.filter(listFct, (o) => { return o.isChecked; });
     if(fctCheckeds && fctCheckeds.length > 0) {
      if(fctCheckeds.length == listFct.length) {
        // Toutes les fct enfant sont coché, il faut coché le parent
        parentFct.isChecked = true;
        parentFct.indeterminate = false;
      }else {
        parentFct.isChecked = false;

        // Si au moins un enfant est coché, on le met en unideterminate
        if(fctCheckeds.length > 0) {
          parentFct.indeterminate = true;
        }else {
          parentFct.isChecked = false;
          parentFct.indeterminate = false;
        }
      }
     }else {
      // Rien aucun enfant n'est coché o
      parentFct.isChecked = false;
      parentFct.indeterminate = false;
     }
    }

    // Checker le undeterminate
    this.getIndeterminateToutCocher();
  }

  getIndeterminateToutCocher() {
    let fctsCheckedsAll = _.filter(this.ListFonctionnalites, (o) => {
      return o.isChecked;
    });

    if (fctsCheckedsAll) {
      if (fctsCheckedsAll.length == this.ListFonctionnalites.length) {
        this.itemToSave.isAllFct = true;
        this.itemToSave.indeterminateCheckAll = false;
      } else {
        if (fctsCheckedsAll.length > 0) {
          // En ce moment il y au moins enfant un qui est coché
          this.itemToSave.isAllFct = false;
          this.itemToSave.indeterminateCheckAll = true;
        } else {
          this.itemToSave.isAllFct = false;
          this.itemToSave.indeterminateCheckAll = false;
        }
      }
    } else {
      this.itemToSave.isAllFct = false;
      this.itemToSave.indeterminateCheckAll = false;
    }
  }

  cancelSave() {
    this.itemToSave = {};
    this.isAllParentChecked = false;
    this.itemToSave.indeterminateCheckAll = false;
    this.itemToSave.isAllFct = false;

    this.ListFonctionnalites.forEach((fct) => {
      fct.isChecked = false;
      fct.isOpen = false;
      fct.indeterminate = false;

      if(fct.privileges && fct.privileges.length > 0) {
        fct.privileges.forEach(prv => {
          prv.isChecked = false;
          prv.isOpen = false;
          prv.indeterminate = false;
        });
      }
     
    });

    this.selectRow({});
  }

  cancelSearch() {
    this.itemToSearch = {};
    this.getItems();
  }

  pageChanged(event) {
    this.currentPage = event?.page;
    this.getItems();
  }

  getDataFonctionnalites() {
    this.privilegeService.getPrivilegeGroupByType().subscribe((response: any) => {
      if (response) {
        this.listePrivileges = response as PrivilegeRessource[];
        this.ListFonctionnalites = this.listePrivileges;
      } else {
        this.listePrivileges = [];
        this.ListFonctionnalites = [];
      }
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

  getItems() {
    this.roleService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null)).subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeRoles = response["content"] as RoleSynchroRE[];
        this.totalItems = response['totalElements'];
      } else {
        this.listeRoles = [];
        this.totalItems = 0;
      }
    });
  }

  getChildrenModuleByIdParent(idParent: any) {
    let moduleChildrens = _.find(this.listeFctByParentId, (o) => {
      return parseInt(o.parentIdModule) == parseInt(idParent);
    });
    return moduleChildrens;
  }

  onConfirmSave() {
    let data = { ...this.itemToSave };

    if (!data.roleName) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner libellé",
        "bottom",
        "center"
      );
      return;
    }

    // Recuperer les fonctionnalites cochés (A REVOIR)
    let fctCoche = _.filter(this.ListFonctionnalites, (o) => {
      return o.isChecked || o.indeterminate;
    });

    let fonctionnalitesCoches = [];

    if(fctCoche && fctCoche.length > 0) {
      fctCoche.forEach(fctChecked => {
        
          fctChecked.privileges.forEach(priv => {
            if(priv.isChecked) {
            fonctionnalitesCoches.push(priv);
            }
          });
      });
    }
  
    if (!fonctionnalitesCoches.length) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez cocher les privilèges associés",
        "bottom",
        "center"
      );
      return;
    }

    if (!this.itemToSave.roleCode || !this.itemToSave.roleName) {
      //  this.toastr.error('Veuillez choisir au moins une fonctionnalité svp!', 'Erreur');
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner les codes et le nom du rôle.",
        "bottom",
        "center"
      );
      return;
    }

    Swal.fire({
      title: data.roleId ? "Mise à jour" : "Enregistrement",

      text: data.roleId
        ? "Vous êtes sur le point de mettre a jour un rôle. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer un rôle. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(data, fonctionnalitesCoches);
      }
    });
  }

  saveItem(data, fonctionnalites) {
    let idsPrivileges = [];

    fonctionnalites.forEach(fct => {
      idsPrivileges.push(fct.privilegeId)
    });

    let request = {
      roleId : this.itemToSave?.roleId || null,
      roleCode: this.itemToSave?.roleCode,
      roleName: this.itemToSave?.roleName,
      prvIds:idsPrivileges
    }

    if(!this.itemToSave?.roleId) {
      this.busyGet = this.roleService.create(request).subscribe(
        (res: any) => {
          if (res) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.cancelSave();
            this.cancelSearch();
          }
        }
      );
    }else{
      this.busyGet = this.roleService.updateRolePrivilege(request).subscribe(
        (res: any) => {
          if (res) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.getMessageOperationSuccessFull(),
              "bottom",
              "center"
            );
            this.cancelSave();
            this.cancelSearch();
          }
        }
      );
    }
    
  }

  selectRow(data) {
    this.selectedRow = { ...data };
  }

  // onSetMatchedFuncs(data?, bool?: boolean) {
  //   this.cancelSave();
  //   console.log("bool", bool);
  //   this.uncheckFull();

  //   if (data) {
  //     // this.disabledMode = bool ? bool : false;
  //     this.itemToSave = data ? { ...data } : {};
  //     console.log("target fonc: ", { ...data }.fonctionnalites);
  //     let foncTarget = { ...data }.fonctionnalites;
  //     // this.listFonctionnalites = itemToModified ? {... itemToModified}.datasFonctionnalite : this.listFonctionnalites;

  //     // if(foncTarget && foncTarget.length){
  //     //   console.log('to be modified fonctionnalites target',foncTarget);

  //     //   this.ListFonctionnalites.map(
  //     //     lf=>{
  //     //       //lf.isChecked = _.find(foncTarget, {'fonctionnaliteCode': lf.code});
  //     //       let totalChecked = 0
  //     //       if (lf.datasChildren && lf.datasChildren.length){
  //     //         lf.datasChildren.map(
  //     //           lfchild=>{
  //     //             lfchild.isChecked = _.find(foncTarget, {'code': lfchild.code});
  //     //             // lfchild.isChecked=true
  //     //             if(lfchild.isChecked){
  //     //               totalChecked ++
  //     //             }
  //     //             if(totalChecked>0){
  //     //               lf.isOpen = true;
  //     //             }

  //     //             lf.isChecked = lf.datasChildren.length== totalChecked

  //     //           }
  //     //         )
  //     //       }
  //     //       else{
  //     //         console.log("code",lf.code)
  //     //         lf.isChecked = _.find(foncTarget, {'code': lf.code});
  //     //       }

  //     //     }
  //     //   )
  //     // }

  //     if (foncTarget && foncTarget.length > 0) {
  //       // Verifier si la fonctionnalité ne dois ^pas etre coché
  //       foncTarget.forEach((oldFct) => {
  //         let hasFonctionnalite = _.find(this.ListFonctionnalites, {
  //           code: oldFct.code,
  //         });

  //         if (hasFonctionnalite) {
  //           hasFonctionnalite.isChecked = true;
  //         }
  //       });
  //     }

  //     this.getIndeterminateToutCocher();
  //   }
  //   this.checkIfAllFuncSelected();
  // }

  // recuperer les privileges d'un role
  getPrivilegeByRole(role:RoleSynchroRE){
    this.cancelSave();
    this.itemToSave = {...role};
    this.busyGet = this.privilegeService.getPrivilegeByRoleId(role.roleId).subscribe(
      (response :any) => {
        console.log(" response busy ",response);
        if(response) {
          this.checkedOldPrivilegeInModification(response);
        }
      }
    )
  }

  checkedOldPrivilegeInModification(listeOldPrivilege : Privilege){
  
    this.ListFonctionnalites.map((fctParent) => {
      if(fctParent.privileges && fctParent.privileges.length > 0) {
        let countItemCoche : number = 0;
        // Pour chaque privilege, nous verifions si c'est compris dans l'ancienne liste
        fctParent.privileges.forEach(prv => {
          let hasExistePrivilege = _.find(listeOldPrivilege, (o) => { return prv.privilegeId === o.privilegeId });

          if(hasExistePrivilege){
            countItemCoche = countItemCoche + 1;
            prv.isChecked = true;
          }
        });
       
        if(countItemCoche === fctParent.privileges.length) {
          fctParent.isChecked = true;
        }else{
          if(countItemCoche > 0){
            fctParent.indeterminate = true;
          }
        }
      }
    });

  }

}
