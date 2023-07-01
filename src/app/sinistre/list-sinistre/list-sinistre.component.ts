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
import { SinistreService } from 'src/app/core/service/sinistre.service';
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
  isActiveInput :boolean = false
  // listeExercices: Array<Exercice> = [];
  // @Input() statutAffaire!: string;
  @Input() refreshDataTable!: string;
  // @Input() noPutAction: boolean = false;
  // @Input() endPoint: any;
  // @Input() isEnCoursPlacementNelson: boolean = false;
  // initialEndPoint: string;
  // statutAffEnum: any;

  constructor(
    private businessOptionalService: BusinessOptionalService,
    private sinistreService: SinistreService,
    private utilities: UtilitiesService,
    private modalService: BsModalService,
    private restClient: RestClientService
  ) {

  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  openModal(template: TemplateRef<any>,data?:any,isActive?:any) {
    this.itemsinistre = {...data}
    this.isActiveInput = isActive || false
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  transmettre(data:any){
    this.sinistreService.transmission(data).subscribe((res:any)=>{
        if (res) {
          console.log(res ,' info sinistre');
          
        }
    })
  }

  confirmTransmettreSinistre(item:any) {
    Swal.fire({
      title: "Transmettre le sinistre",
      text:"Vous êtes sur le point de transmettre un sinistre. Voulez-vous poursuivre cette action ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.transmettre(item);
      }
    });
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
    let  endPoint :any = "sinistres/list?" + 'page=' + `${this.currentPage-1}` + '&size=' + this.itemsPerPage;
    this.busyGet =  this.restClient.get(endPoint)
      .subscribe((res: any) => {
        console.log("res sinistre :",res);
        this.items = res.content.map((elt:any)=>{
          let dateDecl = elt.sinDateDeclaration.split('-');
          let dateSur =  elt.sinDateSurvenance.split('-');
          elt.sinDateDeclaration = dateDecl[2] + '/' + dateDecl[1] + '/' + dateDecl[0];
          elt.sinDateSurvenance =  dateSur[2] + '/' + dateSur[1] + '/' + dateSur[0]
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
    // this.getItems();
    this.getSinistre();
  }
}