import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { Cedante } from 'src/app/core/models/cedante';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import Swal from "sweetalert2";
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { Exercice } from 'src/app/core/models/exercice';
import { ExerciceService } from 'src/app/core/service/exercice.service';

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
  user : User;
  listeExercices : Array<Exercice> = [];
  @Input() statutAffaire! : string;
  @Input() refreshDataTable! : string;
  initialEndPoint : string;

  constructor(private businessOptionalService:BusinessOptionalService,private cedenteService:CedanteService,private exercieService:ExerciceService,private userService:UserService,
    private utilities: UtilitiesService,private modalService: BsModalService) {
    this.user = this.userService.getCurrentUserInfo();

    if(this.user.cedId) {
      this.itemToSearch.cedenteId = this.user.cedId;
    }
  }

  openModal(template: TemplateRef<any>,itemAffaire : BusinessOptional) {
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    if(itemAffaire) {
      this.businessOptionalService.setCurrentOptionalBusiness(itemAffaire);
    }
    this.modalRef = this.modalService.show(template,config);
  }

  closeFormModal($event) {
    this.modalRef.hide();
    this.businessOptionalService.setCurrentOptionalBusiness(null);
    this.getItems();
  }
  
  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  confirmTransmissionOrReturnAffaire(isTransmission:boolean,affaire:BusinessOptional) {
    /** Faire les controls */
    let itemAEnregistrer = Object.assign({}, affaire);

   
    if (itemAEnregistrer)
      Swal.fire({
        title: isTransmission ? "Transmission d'affaire":"Retourner une affaire",
        text:
        isTransmission
            ? "Vous êtes sur le point de transmettre une affaire. Voulez-vous poursuivre cette action ?"
            : "Vous êtes sur le point de retourner une affaire. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {

          if(isTransmission) {
            this.saveTransmission(itemAEnregistrer);
          }else {
            this.saveRetournerAffaire(itemAEnregistrer);
          }
          
        }
      });
  }

  confirmValidationAffaire(affaire:BusinessOptional) {
    /** Faire les controls */
    let itemAEnregistrer = Object.assign({}, affaire);

    if (itemAEnregistrer)
      Swal.fire({
        title: "Validation d'affaire",
        text:"Vous êtes sur le point de valider cette affaire. Voulez-vous poursuivre cette action ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0665aa",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
            this.validationAffaire(itemAEnregistrer);
        }
      });
  }


  saveTransmission(itemAEnregistrer: BusinessOptional) {
    this.busyGet = this.businessOptionalService
    .transmissionAffaire(itemAEnregistrer.affId,itemAEnregistrer)
    .subscribe((response: any) => {

      if(response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
        this.getItems();
      }

    });
  }


  validationAffaire(itemAEnregistrer: BusinessOptional) {
    this.busyGet = this.businessOptionalService
    .validerAffaire(itemAEnregistrer.affId,itemAEnregistrer)
    .subscribe((response: any) => {

      if(response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
        this.getItems();
      }

    });
  }


  saveRetournerAffaire(itemAEnregistrer: BusinessOptional) {
    this.busyGet = this.businessOptionalService
    .retournerAffaire(itemAEnregistrer.affId,itemAEnregistrer)
    .subscribe((response: any) => {
      if(response) {
        this.utilities.showNotification(
          "snackbar-success",
          this.utilities.getMessageOperationSuccessFull(),
          "bottom",
          "center"
        );
        this.getItems();
      }
    });
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


  getExercice(){
    this.exercieService.getAll().subscribe((response : any) => {
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

    console.log(" this.itemToSearch.exeCode ",this.itemToSearch.exeCode);
    
    this.busyGet =
    (!this.user.cedId ?
     this.businessOptionalService.getAffaireFacultativeByReassureurEnTraitement((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),(this.itemToSearch.cedenteId || null),(this.itemToSearch.exeCode || null))
      :
    this.businessOptionalService.getAffaireFacultativeByCedante((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),(this.itemToSearch.exeCode || null))) 
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
