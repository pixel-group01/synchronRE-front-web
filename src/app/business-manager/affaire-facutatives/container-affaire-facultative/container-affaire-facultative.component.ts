import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-container-affaire-facultative',
  templateUrl: './container-affaire-facultative.component.html',
  styleUrls: ['./container-affaire-facultative.component.scss']
})
export class ContainerAffaireFacultativeComponent implements OnInit {

  statutAffaire : any = {}
  modalRef: BsModalRef;
  user : User;
  refreshDataTable : string;

  constructor(private modalService: BsModalService,private userService:UserService) {
    this.statutAffaire = enumStatutAffaire;
    this.user = this.userService.getCurrentUserInfo();
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
  
  ngOnInit(): void {
  }

}
