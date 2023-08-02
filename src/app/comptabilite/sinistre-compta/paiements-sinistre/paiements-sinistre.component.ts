import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiements-sinistre',
  templateUrl: './paiements-sinistre.component.html',
  styleUrls: ['./paiements-sinistre.component.scss']
})
export class PaiementsSinistreComponent implements OnInit {
  items: any =[];
  itemsinistre :any ;
  itemToSave: any = {};
  modalRef: BsModalRef;
  listesSinistre: any=[]
  // listeCedente: Array<Cedante> = [];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number; 
  busyGet: Subscription; 
  user:  any;
  isActiveInput :boolean = false;
  @Input() refreshDataTable!: string;
  @Input() endPoint: any ;
  idSiniOfListe :number;
  @Input() isOngletPaiement: boolean = false;
  @Input() isOngletReversement: boolean = false;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private sinistreService: SinistreService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private restClient: RestClientService
  ) {}

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  openModal(template: TemplateRef<any>,data?:any,option?:boolean) {
    console.log("idSiniOfListe :",this.idSiniOfListe = data);

    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  openModalDetail(template: TemplateRef<any>,data?:any,isActive?:any) {
    this.itemsinistre = {...data}
    this.isActiveInput = isActive || false
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  closeFormModal($event) {
    console.log('okok',$event);    
    this.getSinistre();
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getSinistre();
  }

  getSinistre(){
    let  endPoint :any = this.endPoint + '?page=' + `${this.currentPage-1}` + '&size=' + this.itemsPerPage;
    this.busyGet =  this.restClient.get(endPoint)
      .subscribe((res: any) => {
        console.log("res sinistre :",res);
        this.items = res.content.map((elt:any)=>{
          let dateDecl = elt.sinDateDeclaration?.split('-');
          let dateSur =  elt.sinDateSurvenance?.split('-');
            elt.sinDateDeclaration = dateDecl[2] + '/' + dateDecl[1] + '/' + dateDecl[0];
            elt.sinDateSurvenance =  dateSur[2] + '/' + dateSur[1] + '/' + dateSur[0];
            elt.totalMontant =  elt.sinMontantHonoraire + elt.sinMontant100 
          return elt
        });
        this.totalItems = res.totalElements;
        
      }) 
  } 

  refreschSinistre($event: any) {
    this.modalRef.hide();
    console.log('okok',$event);
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
    console.log("change :",changes);
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
    console.log("endPoint :", this.endPoint);
    this.getSinistre();
  }

}
