import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Cedante } from 'src/app/core/models/cedante';
import { Exercice } from 'src/app/core/models/exercice';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { ExerciceService } from 'src/app/core/service/exercice.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-assiete-prime',
  templateUrl: './assiete-prime.component.html',
  styleUrls: ['./assiete-prime.component.scss']
})
export class AssietePrimeComponent implements OnInit { 
  items: any = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  user: User;
  listeExercices: Array<Exercice> = [];
  @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  @Input() noPutAction: boolean = false;
  @Input() isOngletReversement: boolean = false;
  @Input() isOngletPaiement: boolean = false;
  
  @Input() endPoint: string;
  @Input() idTraitNonProChildren: number;
  
  initialEndPoint: string;
  statutAffEnum: any;
  dataCurrent :any

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private cedenteService: CedanteService,
    private exercieService: ExerciceService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private restClient:RestClientService
  ) {
    this.user = this.userService.getCurrentUserInfo();
    this.statutAffEnum = enumStatutAffaire;

    if (this.user.cedId) {
      this.itemToSearch.cedenteId = this.user.cedId;
    }
  }

  openModal(template: TemplateRef<any>, data?: any) {
    let config = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-width-50",
    };
    // console.log('item terr ::', data);
    this.dataCurrent = data;
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


  getItems() {
    let endPointFinal =
      this.endPoint + (this.idTraitNonProChildren
        ? "?traiNpId=" + this.idTraitNonProChildren
        : "") +
      "&page=" +
      (this.currentPage - 1) +
      "&size=" +
      this.itemsPerPage +
      "" +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") 

    // if (endPointFinal && this.itemToSearch.cedenteId) {
    //   endPointFinal = endPointFinal + "&cedId=" + this.itemToSearch.cedenteId;
    // }

    this.busyGet = this.restClient.get(endPointFinal).subscribe(
      (res) => {
        if (res && res["content"]) {
          this.items = res["content"];
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
    this.getItems();
  }
}