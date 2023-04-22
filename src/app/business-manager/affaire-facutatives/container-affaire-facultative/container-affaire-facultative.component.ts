import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';

@Component({
  selector: 'app-container-affaire-facultative',
  templateUrl: './container-affaire-facultative.component.html',
  styleUrls: ['./container-affaire-facultative.component.scss']
})
export class ContainerAffaireFacultativeComponent implements OnInit {

  statutAffaire : any = {}
  modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) {
    this.statutAffaire = enumStatutAffaire;
  }


  openModal(template: TemplateRef<any>) {

    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-lg'};

    this.modalRef = this.modalService.show(template,config);
  }

  closeFormModal($event:boolean){
    this.modalRef.hide();
  }
  
  ngOnInit(): void {
  }

}
