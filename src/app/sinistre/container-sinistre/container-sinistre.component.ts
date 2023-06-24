import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-container-sinistre',
  templateUrl: './container-sinistre.component.html',
  styleUrls: ['./container-sinistre.component.scss']
})
export class ContainerSinistreComponent implements OnInit {
  modalRef: BsModalRef;

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

    // this.refreshDataTable = new Date().getTime().toString();

    // if($event) {
    //   this.refreshDataTable = new Date().getTime().toString();
    // }
  }
  

}
