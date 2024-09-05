import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { BusinessOptional } from "src/app/core/models/businessOptional";
import { BusinessOptionalService } from "src/app/core/service/business-optional.service";
import { Cedante } from "src/app/core/models/cedante";
import { CedanteService } from "src/app/core/service/cedante.service";
import { UserService } from "src/app/core/service/user.service";
import { User } from "src/app/core/models/user";
import Swal from "sweetalert2";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import { Exercice } from "src/app/core/models/exercice";
import { ExerciceService } from "src/app/core/service/exercice.service";
import { enumStatutAffaire } from "src/app/core/enumerator/enumerator";
import { RestClientService } from "src/app/core/service/rest-client.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: "app-list-affaire-en-comptabilite",
  templateUrl: "./list-affaire-en-comptabilite.component.html",
  styleUrls: ["./list-affaire-en-comptabilite.component.scss"],
})
export class ListAffaireEnComptabiliteComponent implements OnInit {
  items: Array<BusinessOptional> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  fileUrlDebitNote : any;
  busyReport : Subscription;
  user: User;
  listeExercices: Array<Exercice> = [];
  @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  @Input() noPutAction: boolean = false;
  @Input() isOngletReversement: boolean = false;
  @Input() isOngletPaiement: boolean = false;
  @Input() endPoint: string;

  initialEndPoint: string;
  statutAffEnum: any;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private cedenteService: CedanteService,
    private exercieService: ExerciceService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private restClient:RestClientService,
    public sanitizer: DomSanitizer
  ) {
    this.user = this.userService.getCurrentUserInfo();
    this.statutAffEnum = enumStatutAffaire;

    if (this.user.cedId) {
      this.itemToSearch.cedenteId = this.user.cedId;
    }
  }

  openModal(template: TemplateRef<any>, itemAffaire: BusinessOptional) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-65",
    };
    if (itemAffaire) {
      this.itemToSave = { ...itemAffaire };
      this.businessOptionalService.setCurrentOptionalBusiness(itemAffaire);
    }
    this.modalRef = this.modalService.show(template, config);
  }

  getPrintReportDebit(idAffaire: number) {
    if (idAffaire) {
      // window.open(
      //   environment.apiUrl + "reports/display-note-de-debit-fac/" + idAffaire,
      //   "_blank"
      // );
      this.busyReport = this.businessOptionalService.getReportNoteDebit(idAffaire).subscribe(
        (response : any) => {
          console.log(" response ",response);
          let fileUrlDebitNote = "data:application/pdf;base64,"+response?.base64UrlString;

          this.fileUrlDebitNote = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
          // window.open(this.fileUrlDebitNote,"_blank");
        }
      )

    }
  }

  openModalNoteDebit(template: TemplateRef<any>, itemAffaire: BusinessOptional) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-65",
    };
    this.getPrintReportDebit(itemAffaire.affId)
    this.modalRef = this.modalService.show(template, config);
  }

  closeFormModal($event) {
    this.modalRef.hide();
    this.businessOptionalService.setCurrentOptionalBusiness(null);
    this.getItems();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems();
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

  getExercice() {
    this.exercieService.getAll().subscribe((response: any) => {
      if (response) {
        this.listeExercices = response as Exercice[];
        this.itemToSearch.exeCode = this.listeExercices[0].exeCode;

        this.getItems();
      } else {
        this.listeExercices = [];
      }
    });
  }

  // openModal(data: any, template: TemplateRef<any>) {

  //   let config = {backdrop: true, ignoreBackdropClick: true};

  //   this.itemToSave = {};
  //   if (data) {
  //     // Lorsque nous sommes en modification
  //     this.itemToSave = Object.assign({}, data);
  //   }

  //   this.modalRef = this.modalService.show(template,config);
  // }

  getItems() {
    let endPointFinal =
      this.endPoint +
      "?page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") +
      "" +
      (this.itemToSearch.exeCode
        ? "&exeCode=" + this.itemToSearch.exeCode
        : "");

    if (endPointFinal && this.itemToSearch.cedenteId) {
      endPointFinal = endPointFinal + "&cedId=" + this.itemToSearch.cedenteId;
    }

    this.busyGet = this.restClient.get(endPointFinal).subscribe(
      (res) => {
        if (res && res["content"]) {
          this.items = res["content"] as BusinessOptional[];
          this.totalItems = res["totalElements"];
        } else {
          this.items = [];
          this.totalItems = 0;
        }
      },
      (err) => {}
    );
  }

  closeModal($event: any) {
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if ($event) {
      this.getItems();
    }
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["refreshDataTable"] &&
      changes["refreshDataTable"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.currentPage = 1;
      this.getItems();
    }
  }

  ngOnInit() {
    // this.getItems();
    this.getCedente();
    this.getExercice();
  }
}
