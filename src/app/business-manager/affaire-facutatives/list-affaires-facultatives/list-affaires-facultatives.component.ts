import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { Cedante } from 'src/app/core/models/cedante';
import { CedanteService } from 'src/app/core/service/cedante.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/user';
import Swal from "sweetalert2";
import { UtilitiesService } from 'src/app/core/service/utilities.service';

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
  @Input() statutAffaire! : string;
  initialEndPoint : string;

  constructor(private businessOptionalService:BusinessOptionalService,private cedenteService:CedanteService,private userService:UserService,
    private utilities: UtilitiesService) {
    this.user = this.userService.getCurrentUserInfo();

    if(this.user.cedId) {
      this.itemToSearch.cedenteId = this.user.cedId;
    }
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


  saveTransmission(itemAEnregistrer: BusinessOptional) {
    this.busyGet = this.businessOptionalService
    .transmissionAffaire(itemAEnregistrer.affId,itemAEnregistrer)
    .subscribe((response: any) => {
      if (response && response.affId) {
        this.itemToSave = {};
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
      if (response && response.affId) {
        this.itemToSave = {};
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
    this.busyGet =
    (!this.user.cedId ?
     this.businessOptionalService.getAffaireFacultativeByReassureurEnTraitement((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),(this.itemToSearch.cedenteId || null))
      :
    this.businessOptionalService.getAffaireFacultativeByCedante((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null)))
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
