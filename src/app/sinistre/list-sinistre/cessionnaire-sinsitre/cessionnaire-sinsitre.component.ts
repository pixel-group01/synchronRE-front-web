import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';

@Component({
  selector: 'app-cessionnaire-sinsitre',
  templateUrl: './cessionnaire-sinsitre.component.html',
  styleUrls: ['./cessionnaire-sinsitre.component.scss']
})
export class CessionnaireSinsitreComponent implements OnInit {
  @Input() sinistre : any;
  busyGet: Subscription;
  items: any =[];
  itemToSearch: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number; 
  modalRef: BsModalRef;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  fileNoteCessionnaire : any;
  constructor(private sinistreService: SinistreService,
              private modalService: BsModalService,
              private utilities: UtilitiesService,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCessionnaireOfSinistre();
  }

  getCessionnaireOfSinistre(){
    this.busyGet = this.sinistreService.cessionnaireBySinistre(this.sinistre).subscribe((res:any)=>{
      if (res) {
         this.items = res
         console.log(res,'res ok');
         
      }
    })
  }

  imprimer(sinistre:any,itemCEssion:any){
    this.busyGet = this.sinistreService.cessionnaireCedImprimer(sinistre,itemCEssion).subscribe((res :any)=>{
      console.log(res);
      if (res.base64UrlString && res.bytes) {
        let fileUrlDebitNote = "data:application/pdf;base64,"+res?.base64UrlString;
        this.fileNoteCessionnaire = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrlDebitNote);
      }
    })
  }

  envoyer(sinistre:any,itemCession:any){
    console.log(sinistre , itemCession);
    this.busyGet = this.sinistreService.cessionnaireCedEnvoyer(sinistre,itemCession).subscribe((res :any)=>{
      // console.log(res);
      if (res) {
        this.utilities.showNotification(
          "snackbar-success",
          "Votre mail a été envoyé avec succès",
          "top",
          "center"
        );
      }
      
    })
  }

  openModal(template: TemplateRef<any>,sinistre:any,itemCEssion:any) {
    this.imprimer(sinistre,itemCEssion)
    let config = {backdrop: true, ignoreBackdropClick: true,class:'modal-width-65'};
    this.modalRef = this.modalService.show(template,config);
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
  
  closeModalCessionaireBySinistre(){
    this.closeModal.emit(true);
  }
  

  closeFormModal($event) {
    this.modalRef.hide();
  }

}
