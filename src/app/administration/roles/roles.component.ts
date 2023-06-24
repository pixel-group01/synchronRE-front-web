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
  itemsPerPage: number = 20;
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

  setCheckedFull(event, item?) {
    if (this.ListFonctionnalites && this.ListFonctionnalites.length) {
      this.ListFonctionnalites.map((fonct: any) => {
        fonct.isChecked = event.target.checked;
        fonct.isOpen = event.target.checked;
        if (fonct.datasChildren && fonct.datasChildren.length) {
          fonct.datasChildren.map((child) => {
            child.isChecked = event.target.checked;
            child.isOpen = event.target.checked;
          });
        }
      });
    }
  }

  checkIfAllFuncSelected() {
    let parentFonctionnalites = this.ListFonctionnalites.filter(
      (pf) => !pf.parentId
    );

    let unChekedParents = parentFonctionnalites.filter((pF) => !pF.isChecked);

    this.isAllParentChecked = !unChekedParents.length;
  }

  setCheckedChildItem(event, item?) {
   
    let totalChecked = 0;
    if (item.datasChildren && item.datasChildren.length) {
      item.datasChildren.map((child) => {
        if (child.isChecked) {
          totalChecked++;
        }
      });

      item.isChecked = item.datasChildren.length == totalChecked;
    }

    this.checkIfAllFuncSelected();
  }

  displayDetails(item) {
    item.isOpen = !item.isOpen;
  }

  /** Gestion du coché tous */
  setCheckedAllItem() {
   
    _.forEach(this.listePrivileges, (fct) => {
      fct.isChecked = this.itemToSave.isAllFct || false;
    });
  }

  // setCheckedItem(valeur, type, listFct,parentFct : any) {

  //   console.log(" listFct ",listFct);
  //   console.log(" parentFct ",parentFct);

  //   // console.log('event', event);
  //   // console.log('item', item);

  //   // if (item.datasChildren && item.datasChildren.length) {
  //   //   item.datasChildren.map(
  //   //     child => {
  //   //       child.isChecked = event.target.checked;
  //   //     }
  //   //   );
  //   // }
  //   // this.checkIfAllFuncSelected();

  //   if (type == "parent") {
  //     _.forEach(listFct, function (value, key) {
  //         // console.log("la valeur",value);
  //         // console.log("la clé",key);

  //         value.isChecked = valeur;

  //         if (value.datasChildren) {
  //             _.forEach(value.datasChildren, function (valueChild, keyChild) {
  //                 valueChild.isChecked = valeur;

  //                 _.forEach(valueChild.datasChildren, function (valueChildSecond, keyChild) {
  //                     valueChildSecond.isChecked = valeur;
  //                 });

  //             });
  //         }
  //     });
  //   }

  //   if(type == "simple") {
  //    // Verifier si tout les enfants sont cochés
  //    let fctCheckeds = _.filter(listFct, (o) => { return o.isChecked; });
  //    if(fctCheckeds && fctCheckeds.length > 0) {
  //     if(fctCheckeds.length == listFct.length) {
  //       // Toutes les fct enfant sont coché, il faut coché le parent
  //       parentFct.isChecked = true;
  //       parentFct.indeterminate = false;
  //     }else {
  //       parentFct.isChecked = false;

  //       // Si au moins un enfant est coché, on le met en unideterminate
  //       if(fctCheckeds.length > 0) {
  //         parentFct.indeterminate = true;
  //       }else {
  //         parentFct.isChecked = false;
  //         parentFct.indeterminate = false;
  //       }
  //     }
  //    }else {
  //     // Rien aucun enfant n'est coché o
  //     parentFct.isChecked = false;
  //     parentFct.indeterminate = false;
  //    }
  //   }

  //   // Checker le undeterminate
  //   this.getIndeterminateToutCocher();
  // }

  setCheckedItem() {
    // Recuperer le nombre d'élement selectionné
    let privilegeChecked = _.filter(this.listePrivileges, (o) => {
      return o.isChecked;
    });

    if (
      privilegeChecked &&
      privilegeChecked.length > 0 &&
      privilegeChecked.length === this.listePrivileges.length
    ) {
      this.itemToSave.indeterminateCheckAll = false;
      this.itemToSave.isAllFct = true;
    } else {
      if (privilegeChecked && privilegeChecked.length > 0) {
        this.itemToSave.indeterminateCheckAll = true;
      }
      this.itemToSave.isAllFct = false;
    }
  }

  getIndeterminateToutCocher() {
    let fctsCheckedsAll = _.filter(this.ListFonctionnalites, (o) => {
      return o.isChecked;
    });

    console.log(" fctsCheckedsAll ", fctsCheckedsAll);

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
    });

    this.selectRow({});
  }

  cancelSearch() {
    this.itemToSearch = {};
    this.getItems();
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.getItems();
  }

  // getItems(mode?) {
  //   if (mode)
  //     this.config.currentPage = 1
  //   let request = {
  //     user: this.user.id,
  //     isSimpleLoading: false,
  //     // index: (this.currentPage - 1),
  //     // size: this.itemsPerPage,
  //     data: {
  //       profilCode: 100,
  //       code: this.itemToSearch.code

  //     }
  //   }

  //   this.busyGet = this.restClient.post('role/getByCriteria', request).subscribe(
  //     (res: any) => {
  //       console.log('return of getData', res);

  //       if (res && !res.hasError) {
  //         if (res.status.code == 903) {
  //           this.result = []
  //         }
  //         else {
  //           this.result = res.items
  //           // this.selectedRow = this.result[0];
  //           // this.onSetMatchedFuncs(this.selectedRow)
  //           // this.selectRow(this.selectedRow)
  //         }
  //         this.totalItems = res.count

  //       }
  //       else {
  //         this.result = []
  //         this.utilities.showNotification("snackbar-danger",
  //           this.utilities.formatMsgServeur(res.status.message),
  //           "bottom",
  //           "center");

  //       }
  //     },
  //     (error: any) => {
  //       this.result = []
  //       this.utilities.showNotification("snackbar-danger",
  //         this.utilities.formatMsgServeur(error.message),
  //         "bottom",
  //         "center");
  //     }
  //   )
  // }

  getDataFonctionnalites() {
    this.privilegeService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listePrivileges = response["content"] as privilegeSynchroRE[];
        this.ListFonctionnalites = this.listePrivileges;
      } else {
        this.listePrivileges = [];
        this.ListFonctionnalites = [];
      }
    });
  }

  getItems() {
    this.roleService.getAll().subscribe((response: any) => {
      if (response && response["content"]) {
        this.listeRoles = response["content"] as RoleSynchroRE[];
      } else {
        this.listeRoles = [];
      }
    });
  }

  // getDataFonctionnalites() {
  //   let request = {
  //     user: this.user.id,
  //     isSimpleLoading: false,
  //     // hierarchyFormat:true,
  //     data: {

  //     }
  //   }

  //   this.busyGet = this.restClient.post('fonctionnalite/getByCriteria', request).subscribe(
  //     (res: any) => {
  //       console.log('return of getData les fonctionnalites ', res);

  //       if (res && !res.hasError) {
  //         if (res.status?.code == 903) {
  //           this.ListFonctionnalites = []
  //         }
  //         else {
  //           this.ListFonctionnalites = res.items

  //           // Retirer ceux qui ont des codes numerique ce sont les anciens
  //           this.ListFonctionnalites = _.filter(this.ListFonctionnalites, (o) => { return !parseFloat(o.code) });

  //           this.formatHierachicalFonctionnalite();
  //         }
  //         this.totalItems = res.count;

  //       }
  //       else {
  //         this.ListFonctionnalites = []
  //         this.utilities.showNotification("snackbar-danger",
  //           this.utilities.formatMsgServeur(res.status.message),
  //           "bottom",
  //           "center");
  //       }
  //     },
  //     (error: any) => {
  //       this.ListFonctionnalites = []
  //       this.utilities.showNotification("snackbar-danger",
  //         'Connexion momentanément interrompue',
  //         "bottom",
  //         "center");
  //     }
  //   )
  // }

  formatHierachicalFonctionnalite() {
    this.listFonctionalitesHierachises = [];
    if (this.ListFonctionnalites && this.ListFonctionnalites.length > 0) {
      // On recupère la liste des fonctionnalites pour mettre dans une autre variable
      let listFonctionnalites = Object.assign([], this.ListFonctionnalites);

      // Je recupere ceux qui n'on pas de parent id
      let listModuleFonctionnalites = _.filter(listFonctionnalites, (o) => {
        return !o.parentId;
      });

      // On groupe l'ensemble des modules par parentiD
      let fonctionnaliteGroupByParentIds = _.groupBy(
        listFonctionnalites,
        "parentId"
      );

      // On faire un map pour avoir une lise de clé valeur
      this.listeFctByParentId = [];
      _.forEach(fonctionnaliteGroupByParentIds, (value, key) => {
        if (key && parseFloat(key) > 0) {
          this.listeFctByParentId.push({
            parentIdModule: key,
            fcts: value,
          });
        }
      });

      // On parcours la liste des module et pour chaque module on associe c'est sous fct
      // On effectue cette opération justqu'a la 3eme iteration
      _.forEach(listModuleFonctionnalites, (moduleFct) => {
        if (moduleFct && moduleFct?.id) {
          // On rattache c'est sous fonctionnalites
          // Dans le cas ou on le retrouve on met dans un datasChildren
          let moduleChildrens = this.getChildrenModuleByIdParent(moduleFct?.id);

          if (moduleChildrens) {
            moduleFct.datasChildren = moduleChildrens?.fcts;

            // On parcours chaque premier fils
            if (moduleFct.datasChildren && moduleFct.datasChildren.length > 0) {
              _.forEach(moduleFct.datasChildren, (firstSousModule) => {
                if (firstSousModule) {
                  let moduleChildrensFirstFils =
                    this.getChildrenModuleByIdParent(firstSousModule?.id);
                  if (moduleChildrensFirstFils) {
                    firstSousModule.datasChildren = moduleChildrens?.fcts;

                    // On parcours le sous fils
                    if (
                      firstSousModule.datasChildren &&
                      firstSousModule.datasChildren.length > 0
                    ) {
                      _.forEach(
                        firstSousModule.datasChildren,
                        (secondSousModule) => {
                          let moduleChildrensSecondFils =
                            this.getChildrenModuleByIdParent(
                              secondSousModule?.id
                            );
                          // Verifier si il doit être coché au cas ou nous sommes en modification
                          if (moduleChildrensSecondFils) {
                            secondSousModule.datasChildren =
                              moduleChildrensSecondFils?.fcts;

                            // Traitemet du sous sous fils
                            // On parcours le sous fils
                            if (
                              secondSousModule.datasChildren &&
                              secondSousModule.datasChildren.length > 0
                            ) {
                              _.forEach(
                                secondSousModule.datasChildren,
                                (thirdSousModule) => {
                                  let moduleChildrensThirdFils =
                                    this.getChildrenModuleByIdParent(
                                      thirdSousModule?.id
                                    );
                                  // Verifier si il doit être coché au cas ou nous sommes en modification
                                  if (moduleChildrensThirdFils) {
                                    thirdSousModule.datasChildren =
                                      moduleChildrensThirdFils?.fcts;
                                  }
                                }
                              );
                            }
                          }
                        }
                      );
                    }

                    //
                  }
                }
              });
            }
          }
        }

        // On ajoute le module a   la liste
        this.listFonctionalitesHierachises.push(moduleFct);

        console.log(
          " this.listFonctionalitesHierachises ",
          this.listFonctionalitesHierachises
        );
      });
    }
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

    let fonctionnalites = [];

    // Recuperer les fonctionnalites cochés (A REVOIR)
    let fctCoche = _.filter(this.ListFonctionnalites, (o) => {
      return o.isChecked || o.indeterminate;
    });
    if (fctCoche && fctCoche.length > 0) {
      fonctionnalites = fctCoche;
    }

    if (!fonctionnalites.length) {
      //  this.toastr.error('Veuillez choisir au moins une fonctionnalité svp!', 'Erreur');
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
      title: data.id ? "Mise à jour" : "Enregistrement",

      text: data.id
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
        this.saveItem(data, fonctionnalites);
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
        },
        (error: any) => {
          this.utilities.showNotification(
            "snackbar-danger",
            "Connexion momentanément interrompue",
            "bottom",
            "center"
          );
        }
      );
    }else{
      this.busyGet = this.roleService.update(request).subscribe(
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
        },
        (error: any) => {
          this.utilities.showNotification(
            "snackbar-success",
            "Connexion momentanément interrompue",
            "bottom",
            "center"
          );
        }
      );
    }
    
  }

  selectRow(data) {
    this.selectedRow = { ...data };
  }

  onSetMatchedFuncs(data?, bool?: boolean) {
    this.cancelSave();
    console.log("bool", bool);
    this.uncheckFull();

    if (data) {
      // this.disabledMode = bool ? bool : false;
      this.itemToSave = data ? { ...data } : {};
      console.log("target fonc: ", { ...data }.fonctionnalites);
      let foncTarget = { ...data }.fonctionnalites;
      // this.listFonctionnalites = itemToModified ? {... itemToModified}.datasFonctionnalite : this.listFonctionnalites;

      // if(foncTarget && foncTarget.length){
      //   console.log('to be modified fonctionnalites target',foncTarget);

      //   this.ListFonctionnalites.map(
      //     lf=>{
      //       //lf.isChecked = _.find(foncTarget, {'fonctionnaliteCode': lf.code});
      //       let totalChecked = 0
      //       if (lf.datasChildren && lf.datasChildren.length){
      //         lf.datasChildren.map(
      //           lfchild=>{
      //             lfchild.isChecked = _.find(foncTarget, {'code': lfchild.code});
      //             // lfchild.isChecked=true
      //             if(lfchild.isChecked){
      //               totalChecked ++
      //             }
      //             if(totalChecked>0){
      //               lf.isOpen = true;
      //             }

      //             lf.isChecked = lf.datasChildren.length== totalChecked

      //           }
      //         )
      //       }
      //       else{
      //         console.log("code",lf.code)
      //         lf.isChecked = _.find(foncTarget, {'code': lf.code});
      //       }

      //     }
      //   )
      // }

      if (foncTarget && foncTarget.length > 0) {
        // Verifier si la fonctionnalité ne dois ^pas etre coché
        foncTarget.forEach((oldFct) => {
          let hasFonctionnalite = _.find(this.ListFonctionnalites, {
            code: oldFct.code,
          });

          if (hasFonctionnalite) {
            hasFonctionnalite.isChecked = true;
          }
        });
      }

      this.getIndeterminateToutCocher();
    }
    this.checkIfAllFuncSelected();
  }

  // Cocher les

  onConfirmDelete(data) {
    Swal.fire({
      title: "Suppression",
      text: "Vous êtes sur le point de supprimer un élémement. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.deleteItem(data);
      }
    });
  }

  deleteItem(data) {
    let action = "delete";
    let request = {
      user: this.user.id,
      isSimpleLoading: false,
      datas: [
        {
          id: data.id,
        },
      ],
    };

    this.busyGet = this.restClient.post("role/" + action, request).subscribe(
      (res: any) => {
        console.log("return of deleteItem", res);

        if (res && !res.hasError) {
          // this.toastr.success(res.status.message, 'Succès')
          this.cancelSave();
          this.cancelSearch();
          this.getItems();
        } else {
          this.utilities.showNotification(
            "snackbar-danger",
            res.status.message,
            "bottom",
            "center"
          );
        }
      },
      (error: any) => {
        // this.toastr.error('Connexion momentanément interrompue', 'Erreur');
      }
    );
  }

  hasChildrenIncluded(id, fonctionnalites) {
    return _.find(fonctionnalites, ["parentId", id]);
  }

  uncheckFull() {
    if (this.ListFonctionnalites && this.ListFonctionnalites.length) {
      this.ListFonctionnalites.map((fonct: any) => {
        fonct.isChecked = false;
        fonct.isOpen = false;
        if (fonct.datasChildren && fonct.datasChildren.length) {
          fonct.datasChildren.map((child) => {
            child.isChecked = false;
            child.isOpen = false;
          });
        }
      });
    }
  }
}
