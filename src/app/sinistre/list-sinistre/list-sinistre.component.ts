import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { RestClientService } from 'src/app/core/service/rest-client.service';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UserService } from 'src/app/core/service/user.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
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
  isActiveInput :boolean = false;
  isActiveModif :boolean = true;
  @Input() refreshDataTable!: string;
  @Input() endPoint: any ;
  @Input() code: any ;
  idSiniOfListe :number;
  endPointRetourne :string;
  endPointMessage : string;
  currentUser:any;
  @Input() noPutAction1: boolean = false;
  @Input() noPutAction2: boolean = false;
  @Input() noPutAction3: boolean = false;
  constructor(
    private businessOptionalService: BusinessOptionalService,
    private sinistreService: SinistreService,
    private utilities: UtilitiesService,
    private userService : UserService,
    private modalService: BsModalService,
    private restClient: RestClientService
  ) {}


  ngOnInit() {
    // this.getItems();
    this.currentUser  = this.userService.getCurrentUserInfo();     
    console.log("this.currentUser ::",this.currentUser);
    console.log("endPoint :", this.endPoint);
    console.log("code :", this.code);
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

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * this.itemsPerPage + (index + 1);
    }
    return num;
  }

  openModal(template: TemplateRef<any>,data?:any,isActive?:boolean) {
    this.itemsinistre = {...data}
    this.isActiveInput = isActive || false
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  openModalRetourner(template: TemplateRef<any>,item:any,endPoint?:string) {
    this.idSiniOfListe = item;
    this.endPointRetourne =endPoint;
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  openModalMessage(template: TemplateRef<any>,item:any,endPoint?:string) {
    this.idSiniOfListe = item;
    this.endPointMessage = endPoint;
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  openModalEtatComptable(template: TemplateRef<any>,item:any) {
    console.log("idSiniOfListe :",this.idSiniOfListe = item);
    
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }


  transmettreSouscripteur(data:any){
    this.sinistreService.transmissionAuSouscripteur(data).subscribe((res:any)=>{
          setTimeout(() => {
            this.getSinistre();
          }, 100);
    })
  }

  transmettreValidateur(data:any){
    this.sinistreService.transmissionAuValidateur(data).subscribe((res:any)=>{
          setTimeout(() => {
            this.getSinistre();
          }, 100);
    })
  }

  confirmTransmettreSouscripteur(item:any) {
    // console.log(item ,' info sinistre');
    Swal.fire({
      title: "Transmettre le sinistre",
      text:"Vous êtes sur le point de transmettre un sinistre au souscripteur. Voulez-vous poursuivre cette action ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.transmettreSouscripteur(item);
      }
    });
  }

  confirmTransmettreValidation(item:any) {
    // console.log(item ,' info sinistre');
    Swal.fire({
      title: "Transmettre le sinistre",
      text:"Vous êtes sur le point de transmettre un sinistre à la validation. Voulez-vous poursuivre cette action ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.transmettreValidateur(item);
      }
    });
  }


  messageDuRetour(data:any){
    this.sinistreService.messageRetour(data).subscribe((res :any)=>{
        console.log("message retour :",res);
        
    })
  }

  confirmValiderSinistre(item:any) {
    Swal.fire({
      title: "Validation d'un sinistre",
      text:"Vous êtes sur le point de valider un sinistre. Voulez-vous poursuivre cette action ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.validerSinistre(item);
      }
    });
  }

  validerSinistre(item: any) {
    this.sinistreService.validation(item).subscribe((res: any) => {
      setTimeout(() => {
        this.getSinistre();
      }, 100);
    })
  }
  
  closeFormModal($event) {
    // console.log('okok',$event);    
    this.getSinistre();
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getSinistre();
  }

  getSinistre(){
    let  endPoint :any = 
      this.endPoint +
     '?page=' + `${this.currentPage-1}`
      + '&size=' + this.itemsPerPage +
      (this.itemToSearch.libelle ? "&key=" + this.itemToSearch.libelle : "");
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

  historique(item:any){
    this.sinistreService.histoSinist(item).subscribe((res:any)=>{

      console.log("res histo",res);
      
    })
  }


}