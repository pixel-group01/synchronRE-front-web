import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sinistre-compta',
  templateUrl: './sinistre-compta.component.html',
  styleUrls: ['./sinistre-compta.component.scss']
})
export class SinistreComptaComponent implements OnInit {
  modalRef: BsModalRef;
  refreshDataTable : string;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
  }

  closeFormModal($event:boolean){
    this.modalRef.hide();    
    this.refreshDataTable = new Date().getTime().toString();

    // if($event) {
    //   this.refreshDataTable = new Date().getTime().toString();
    // }
  }
  
}
