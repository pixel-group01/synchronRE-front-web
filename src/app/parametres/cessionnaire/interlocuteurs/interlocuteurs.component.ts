import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Interlocuteur } from 'src/app/core/models/interlocuteur';
import { CessionnaireService } from 'src/app/core/service/cessionnaire.service';
import { InterlocuteurService } from 'src/app/core/service/interlocuteur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interlocuteurs',
  templateUrl: './interlocuteurs.component.html',
  styleUrls: ['./interlocuteurs.component.scss']
})
export class InterlocuteursComponent implements OnInit {

  items: any= [];
  itemToSave: any = {};
  modalRef: BsModalRef;
  // user: any = {};
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;
  cesId :number
  querySub: Subscription;
  trackForm: any;
  constructor(private modalService: BsModalService,private route: ActivatedRoute,
              private interlocuteurService:InterlocuteurService) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page ;
    this.getItems();
  }

  openModal(data: any, template: TemplateRef<any>) {
    
    let config = {backdrop: true, ignoreBackdropClick: true};

    this.itemToSave = {};
    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = Object.assign({}, data);
    }

    this.modalRef = this.modalService.show(template,config);
  }

  getItems() {
    this.busyGet = this.interlocuteurService.getByCriteria((this.currentPage - 1),this.itemsPerPage,(this.itemToSearch.libelle ? this.itemToSearch.libelle : null),this.cesId)
      .subscribe(
        res => {
        console.log(res,'res');
          if (res && res['content']) {
            this.items = res['content'] as Interlocuteur[];
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
          num = ((page - 1) * this.itemsPerPage) + (index+1);
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

  chargementOfGetInterlocuteur(){
    this.querySub = this.route.params.subscribe(
      (param:Params)=>{
        if(param.id != undefined){
          this.cesId = param.id ;
          this.getItems();
        }
      }
    );
  }

  delete(item:any){
    this.interlocuteurService.delete(item).subscribe((res:any)=>{
        console.log(res,"delete inter");
        this.getItems()
    })
  }

  comfirmeDelete(item:any){
    Swal.fire({
      title: "Interlocuteur",
      text:"Vous êtes sur le point de supprimer un interlocuteur. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.delete(item)
      }
    });
  }

  ngOnInit() {
    this.chargementOfGetInterlocuteur()
  }

}
