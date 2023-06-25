import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { User } from 'angular-feather/icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { Cedante } from 'src/app/core/models/cedante';
import { Exercice } from 'src/app/core/models/exercice';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { ExerciceService } from 'src/app/core/service/exercice.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-sinistre',
  templateUrl: './list-sinistre.component.html',
  styleUrls: ['./list-sinistre.component.scss']
})
export class ListSinistreComponent implements OnInit {
  items: any =[];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listesSinistre: any=[]
  // listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number; 
  busyGet: Subscription;
  user:  any;
  // listeExercices: Array<Exercice> = [];
  // @Input() statutAffaire!: string;
  // @Input() refreshDataTable!: string;
  // @Input() noPutAction: boolean = false;
  // @Input() endPoint: any;
  // @Input() isEnCoursPlacementNelson: boolean = false;
  // initialEndPoint: string;
  // statutAffEnum: any;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private cedenteService: CedanteService,
    private exercieService: ExerciceService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private restClient: RestClientService
  ) {
    // this.user = this.userService.getCurrentUserInfo();
    // this.statutAffEnum = enumStatutAffaire;

    // if (this.user.cedId) {
    //   this.itemToSearch.cedenteId = this.user.cedId;
    // }
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  getItems() {
    // let endPointFinal ="sinistres/list?page=0&size=10"
    //   this.endPoint +
    //   "?page=" +
    //   (this.currentPage - 1) +
    //   "&size=" +
    //   this.itemsPerPage +
    //   "" +
    //   (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "") +
    //   "" +
    //   (this.itemToSearch.exeCode
    //     ? "&exeCode=" + this.itemToSearch.exeCode
    //     : "");

    // if (endPointFinal && this.itemToSearch.cedenteId) {
    //   endPointFinal = endPointFinal + "&cedId=" + this.itemToSearch.cedenteId;
    // }

    // this.busyGet = this.restClient.get(endPointFinal).subscribe(
    //   (res) => {
    //     if (res && res["content"]) {
    //       this.items = res["content"] as BusinessOptional[];
    //       this.totalItems = res["totalElements"];
    //     } else {
    //       this.items = [];
    //       this.totalItems = 0;
    //     }
    //   },
    //   (err) => {}
    // );
  }

  openModal(template: TemplateRef<any>,data:any) {
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
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

  getSinistre(){
    this.busyGet =  this.restClient.get('sinistres/list')
      .subscribe((res: any) => {
        console.log("res sinistre :",res);
        this.items = res.content
        this.totalItems = res.totalPages;
        
      })
  }

  closeModal($event: any) {
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if ($event) {
      this.getSinistre();
    }
  }

  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getSinistre();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["refreshDataTable"] &&
      changes["refreshDataTable"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.currentPage = 1;
      this.getSinistre();
    }
  }

  ngOnInit() {
    // this.getItems();
    this.getSinistre();
  }
}