import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RestClientService } from 'src/app/core/service/rest-client.service';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {

  listItems : Array<any> = [];
  itemToSave : any = {};
  modalRef: BsModalRef;
  
  constructor(private restClient : RestClientService, private modalService: BsModalService) {}

  confirmSaveItem(item){

  } 

  openModal(data: any, template: TemplateRef<any>) {

    this.itemToSave = {};
    if (data) {
      // Lorsque nous sommes en modification
      this.itemToSave = Object.assign({}, data);
    }

    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  
    let objTest = {};
    for(var i=0;i<10;i++){

      objTest = {
        nom : "ADOU",
        prenoms : "BROU JACQUES",
        dateNaissance : "03/02/2021",
        lieuNaissance : "AFFOUKRO",
        genre : "MASCULIN"
      }

      this.listItems.push(objTest);
    }

  }
}
