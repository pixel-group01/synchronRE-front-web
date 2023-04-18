import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/service/auth.service";
import { RestClientService } from "src/app/core/service/rest-client.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as _ from "lodash";

@Component({
  selector: "app-utilisateurs",
  templateUrl: "./utilisateurs.component.html",
  styleUrls: ["./utilisateurs.component.scss"],
})
export class UtilisateursComponent implements OnInit {
  listItems: Array<any> = [];
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
    private utilities: UtilitiesService
  ) {
    this.user = this.authService.currentUserValue;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems();
  }
  resetForm() {
    this.itemToSave.typeActeId = null;
    this.itemToSave.libelle = "";
  }

  confirmSaveItem(item) {
    console.log('item: ', item)

    console.log(" itemToSave ", this.itemToSave);
    console.log(" item ", item);

    // item.specialiteId = this.selectedSpecialite.id

    if (!item || !item.civilite) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner civilité !",
        "bottom",
        "center"
      );
      return;
    }
    if (!item || !item.nom) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner nom !",
        "bottom",
        "center"
      );
      return;
    }
    item.nom = item.nom.toUpperCase()

    if (!item || !item.prenom) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner prenom !",
        "bottom",
        "center"
      );
      return;
    }

    item.prenom = item.prenom.toUpperCase()

    if (!item || !item.roleId) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner role !",
        "bottom",
        "center"
      );
      return;
    }

    if (!item || !item.contact) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner contact !",
        "bottom",
        "center"
      );
      return;
    }
    // item.dateNais=this.dateNais
    // if (!item || !item.bsValue) {
    //   this.utilities.showNotification("snackbar-danger", "Veuillez renseigner date naissance !",
    //     "bottom",
    //     "center"
    //   );
    //   return;
    // }

    // if (!item || !item.email) {
    //   this.utilities.showNotification(
    //     "snackbar-danger",
    //     "Veuillez renseigner e-mail !",
    //     "bottom",
    //     "center"
    //   );
    //   return;
    // }

    if (!item || !item.login) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner login !",
        "bottom",
        "center"
      );
      return;
    }
    if (
      !this.listSelectedUniteFonctionnelle ||
      !this.listSelectedUniteFonctionnelle.length
    ) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner Unité fonctionnelle !",
        "bottom",
        "center"
      );
      return;
    }

    if (!item || (item.isMedecin && !item.specialiteId)) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner spécialité !",
        "bottom",
        "center"
      );
      return;
    }

    if (!item.dateNais) {
      this.utilities.showNotification(
        "snackbar-danger",
        "Veuillez renseigner la date de naissance !",
        "bottom",
        "center"
      );
      return;
    }

    item.dateNais = moment(item.dateNais).format("DD/MM/YYYY");

    let objToSave = Object.assign({}, item);
    // if (!item.typeActeId) {
    //   this.utilities.showNotification("snackbar-danger", "Veuillez renseigner le type d'acte !",
    //     "bottom",
    //     "center");
    //   return;
    // }

    Swal.fire({
      title: "Utilisateur",
      text: objToSave?.id
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
        // objToSave.libelle = objToSave.libelle.toUpperCase();
        this.saveItem(objToSave);
      }
    });
  }

  openModal(data: any, template: TemplateRef<any>) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      id: 1,
      // class: "modal-lg",
      class: "gray modal-lg modal-width-65",
    };
    this.itemToSave = {};
    this.imageDisplay = "";
    this.listSelectedUniteFonctionnelle = [];
    if (data) {
      // Lorsque nous sommes en modification
      // this.bsValue = data.dateNais
      console.log('data', data);
      this.listSelectedUniteFonctionnelle = data.uniteFonctionnelles
      this.listSelectedUniteFonctionnelle.map(suf => {
        suf.id = suf.idUniteFonctionnelle
        suf.libelle = suf.libelleUniteFonctionnelle

      })

      console.log('hello: ', this.listSelectedUniteFonctionnelle);


      this.itemToSave = Object.assign({}, data);

      // Si nous sommes en modification reformater la date
      if (data.dateNais) {
        data.dateNais = moment(data.dateNais, 'YYYY-MM-DD').toDate();
      }

      if (data.photo) {
        this.imageDisplay = data.photo;
      }
    }

    this.modalRef = this.modalService.show(template, config);
  }

  saveItem(item) {
    console.log("item to save", item);

    this.loading = true;

    let itemAEnregistrer = Object.assign({}, item, {
      class: "full-screen-modal modal-lg",
    });
    let reduce = [];
    this.listSelectedUniteFonctionnelle.map((dp) => {
      reduce.push({
        id: dp.id,

      });
      console.log(reduce);
    });
    itemAEnregistrer.isMedecin = item.isMedecin ? item.isMedecin : false;
    itemAEnregistrer.datasUniteFonctionnelles = reduce;
    if (this.currentItemImage && Object.keys(this.currentItemImage).length) {
      itemAEnregistrer.dataPhoto = this.currentItemImage;
    } else {
      delete itemAEnregistrer.dataPhoto;
    }
    var request = {
      user: this.user.id,
      datas: [itemAEnregistrer],
    };

    this.busySave = this.restClient
      .post(
        this.endPoint + "" + (itemAEnregistrer.id ? "update" : "create"),
        request
      )
      .subscribe(
        (res) => {
          console.log("resul", res);
          this.loading = false;

          if (!res["hasError"]) {
            if (res["items"] && res["items"].length > 0) {
              this.utilities.showNotification(
                "snackbar-success",
                this.utilities.formatMsgServeur(res["status"]["message"]),
                "bottom",
                "center"
              );

              this.getItems();
              this.modalRef.hide();
            }
          } else {
            if (res["status"] && res["status"]["message"]) {
              this.utilities.showNotification(
                "snackbar-danger",
                this.utilities.formatMsgServeur(res["status"]["message"]),
                "bottom",
                "center"
              );
            }
          }
        },
        (err) => {
          this.utilities.showNotification(
            "snackbar-danger",
            this.utilities.getMessageEndPointNotAvailble(),
            "bottom",
            "center"
          );
          this.loading = false;
        }
      );
  }

  getItems() {
    let request = {
      user: this.user.id,
      data: {
        nom: this.itemToSearch.libelle ? this.itemToSearch.libelle : null,
      },
      index: this.currentPage - 1,
      size: this.itemsPerPage,
    };

    this.busyGet = this.restClient
      .post(this.endPoint + "/getByCriteria", request)
      .subscribe(
        (res) => {
          if (res && res["items"]) {
            this.items = res["items"];
            this.totalItems = res["count"];
          } else {
            this.items = [];
            this.totalItems = 0;
          }
        },
        (err) => { }
      );
  }

  getItemsRoles() {
    console.log("getting data");
    let request = {
      user: this.user.id,
      data: {},
    };

    this.busyGet = this.restClient
      .post("role/getByCriteria", request)
      .subscribe(
        (res) => {
          console.log("itemsRole", res);

          if (res && res["items"]) {
            this.itemsRole = _.orderBy(res["items"], ['libelle']);
          } else {
            this.itemsRole = [];
          }
        },
        (err) => { }
      );
  }

  getItemsUniteFonctionnelle() {
    let request = {
      user: this.user.id,
      data: {

      },
    }

    this.busyGet = this.restClient
      .post("adminUniteFonctionnelle/getByCriteria", request)
      .subscribe(
        res => {
          console.log('itemsUniteFonctionnelle', res);

          if (res && res['items']) {
            this.itemsUniteFonctionnelle = res['items'];

          }
          else {
            this.itemsUniteFonctionnelle = [];
          }
        },
        (err) => { }
      );
  }

  getItemsSpecialite() {
    let request = {
      user: this.user.id,
      data: {},
    };

    this.busyGet = this.restClient
      .post("adminSpecialite/getByCriteria", request)
      .subscribe(
        (res) => {
          console.log("itemsSpecialites", res);

          if (res && res["items"]) {
            this.itemsSpecialites = _.orderBy(
              res["items"],
              ["libelle"],
              ["asc"]
            );
          } else {
            this.itemsSpecialites = [];
          }
        },
        (err) => { }
      );
  }

  confirmDelete(item) {
    Swal.fire({
      title: "Utilisateur",
      text: "Vous êtes sur le point de supprimer cet utilisateur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.deleteItem(item);
      }
    });
  }

  deleteItem(obj) {
    var request = {
      user: this.user.id,
      datas: [obj],
    };

    this.busyGet = this.restClient
      .post(this.endPoint + "delete", request)
      .subscribe(
        (res) => {
          console.log(res);
          if (!res["hasError"]) {
            this.utilities.showNotification(
              "snackbar-success",
              this.utilities.formatMsgServeur(res["status"]["message"]),
              "bottom",
              "center"
            );

            this.currentPage = 1;
            this.getItems();
          } else {
            if (res["status"] && res["status"]["message"]) {
              this.utilities.showNotification(
                "snackbar-danger",
                this.utilities.formatMsgServeur(res["status"]["message"]),
                "bottom",
                "center"
              );
            }
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

  onSelectDate(event) {
    if (event) {
      (this.dateNais = moment(event).format("DD/MM/YYYY")),
        console.log("dateNais", this.dateNais);
    }
  }

  uploadFile(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const fileName = file.name.split(".")[0];
      const Tabextension = file.name.split(".");
      const extension = Tabextension[Tabextension.length - 1];

      console.log("fileName", fileName);
      console.log("extension", extension);
      this.imageName = fileName + "." + extension;
      reader.onload = (readerEvent) => {
        const data = (readerEvent.target as any).result;
        this.imageDisplay = data;
        const fileBase64 = data.split(",")[1];
        this.currentItemImage = {
          fileBase64: fileBase64,
          fileName: fileName,
          extension: extension,
          typeDocument: "custom type",
        };
      };
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  toggleIsMedecin(itemToToggle) {
    itemToToggle.isMedecin = !itemToToggle.isMedecin
  }

  onSelectUniteFonctionnelle() {
    // console.log(this.selectedUniteFoncId);
    // if (
    //   this.listSelectedUniteFonctionnelle ||
    //   this.listSelectedUniteFonctionnelle.length
    // ) {
    //   let isExist = this.listSelectedUniteFonctionnelle.filter(
    //     (lsf) => lsf.id == this.selectedUniteFoncId
    //   ).length
    //   if (isExist) {
    //     this.utilities.showNotification(
    //       "snackbar-danger",
    //       this.utilities.formatMsgServeur(
    //         "Cette unité fonctionnelle exite dejà dans la liste"
    //       ),
    //       "bottom",
    //       "center"
    //     );
    //     return;
    //   }

    // }

    // let uf = this.itemsUniteFonctionnelle.filter(uf=>uf.id == this.selectedUniteFoncId)[0]
    // this.listSelectedUniteFonctionnelle.push(uf)
    // console.log('listSelectedUniteFonctionnelle: ',this.listSelectedUniteFonctionnelle);

    // this.listSelectedUniteFonctionnelle=this.listSelectedUniteFonctionnelle.reverse()


    // On verifie si une unité fonctionnelle est selectionnée
    if (this.uniteFonctionnelleSelected && this.uniteFonctionnelleSelected?.id) {

      // On verifie si l'unité fonctionnelle n'est pas dans la liste
      let isExisteUniteFct = _.find(this.listSelectedUniteFonctionnelle, (o) => { return o.id == this.uniteFonctionnelleSelected?.id });
      if (isExisteUniteFct) {
        this.utilities.showNotification("snackbar-danger", "Cette unité fonctionnelle exite dejà dans la liste", "bottom", "center");
        return;
      }

      // Dan sle cas conteraire le l'ajopute a la liste
      this.listSelectedUniteFonctionnelle.push(this.uniteFonctionnelleSelected);
      this.listSelectedUniteFonctionnelle = this.listSelectedUniteFonctionnelle?.reverse();
    }

  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  ngOnInit() {
    this.resetForm();
    this.getItems();
    this.getItemsRoles();
    this.getItemsSpecialite();
    this.getItemsUniteFonctionnelle();
  }
}
