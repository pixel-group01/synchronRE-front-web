import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { Cedante } from 'src/app/core/models/cedante';
import { CedanteService } from 'src/app/core/service/cedante.service';

@Component({
  selector: 'app-list-affaires-facultatives',
  templateUrl: './list-affaires-facultatives.component.html',
  styleUrls: ['./list-affaires-facultatives.component.scss']
})
export class ListAffairesFacultativesComponent implements OnInit {
  items: Array<BusinessOptional> = [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;

  @Input() statutAffaire! : string;
  constructor(private businessOptionalService:BusinessOptionalService,private cedenteService:CedanteService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  getCedente(){
    this.cedenteService.getAll().subscribe(
      (response : any) => {
        if (response && response['content']) {
          this.listeCedente = response['content'] as Cedante[];
        }
        else {
          this.listeCedente = [];
        }
      }
    )
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
    this.busyGet = this.businessOptionalService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null))
      .subscribe(
        res => {
          if (res && res['content']) {
            this.items = res['content'] as BusinessOptional[];
            this.totalItems = res['totalElements'];
          }
          else {
            this.items = [];
            this.totalItems = 0;
          }
        },
        err => {
        }
      );
  }

  closeModal($event : any){
    this.modalRef.hide();

    // Dans le cas ou $event vaut true alors on actualise la liste
    if($event) {
      this.getItems();
    }
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
  
  changePaginationSize($event) {
    if($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getItems();
  }

  ngOnInit() {
    this.getItems();
    this.getCedente();
  }


}