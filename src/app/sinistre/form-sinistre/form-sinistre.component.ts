import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { AuthService } from 'src/app/core/service/auth.service';
 
export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'pills', isKeysAllowed: true });
}
@Component({
  selector: 'app-form-sinistre',
  templateUrl: './form-sinistre.component.html',
  styleUrls: ['./form-sinistre.component.scss']
})
export class FormSinistreComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() itemSinistre :any ;
  @Input() isActive :boolean ;
  @Input() isModification :boolean ;
  idSinistre :number;
  staticTabs :number;
  user:any
  constructor(private authService: AuthService) { 
    // console.log(this.user = this.authService.currentUser);
    
  }

  ngOnInit(): void {
    const clsButton1 = document.querySelector<HTMLElement>(".cls-indent-sinis1")
      if(clsButton1){
        clsButton1.style.backgroundColor = "#ffc20f";
        clsButton1.style.color = "#fff";
        clsButton1.style.borderColor = "#ffc20f";
      }
      this.staticTabs = 1;  
      this.fonctionButton();
      console.log('isActive ::::',this.isActive);
      
    }

  fonctionButton(){
    const clsButton1 = document.querySelector<HTMLElement>(".cls-indent-sinis1")
    const clsButton2 = document.querySelector<HTMLElement>(".cls-indent-sinis2")
    if (this.itemSinistre) {
      if(clsButton1 && clsButton2){
        clsButton1.style.cursor = "pointer";
        clsButton2.style.cursor = "pointer";
      }
    }else{
      clsButton1.style.cursor = "initial";
      clsButton2.style.cursor = "initial";
    }
  }

  closeFormModal(event:any) {    
    // console.log('ok ok ',event);
    this.closeModal.emit(event); 
  }

  receiveStep1(evt:any){
    console.log("evt 11:",evt);
    this.itemSinistre = {...evt}
    this.idSinistre = evt.sinId;
    setTimeout(() => {
       this.selectTab(2,true)
    }, 300);
  }

  precedent(evt:any){
    // console.log(" :",evt);
    // this.itemSinistre = evt;
    this.selectTab(1,true)
  }
 
  selectTab(tabId: number,isUpdate?:boolean) {
    if (isUpdate) {
      this.staticTabs = tabId
      
      const clsButton1 = document.querySelector<HTMLElement>(".cls-indent-sinis1")
      const clsButton2 = document.querySelector<HTMLElement>(".cls-indent-sinis2")
      if(tabId == 1){
        if(clsButton1){
          clsButton1.style.backgroundColor = "#ffc20f";
          clsButton1.style.color = "#fff";
          clsButton1.style.borderColor = "#ffc20f";
          clsButton1.style.transition = "0.3s";

          clsButton2.style.backgroundColor = "#f9fafb";
          clsButton2.style.color = "#000";
          clsButton2.style.borderColor = "#fff";
          clsButton2.style.transition = "0.3s";

        }
      }else{
        if(tabId == 2){
          if(clsButton2){
            clsButton2.style.backgroundColor = "#ffc20f";
            clsButton2.style.color = "#fff";
            clsButton2.style.borderColor = "#ffc20f";
           clsButton2.style.transition = "0.3s";

          clsButton1.style.backgroundColor = "#f9fafb";
          clsButton1.style.color = "#000";
          clsButton1.style.borderColor = "#fff";
          clsButton1.style.transition = "0.5s";

          }
      }
  }
    }
      
}

}