import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-traite-non-proportionnel',
  templateUrl: './form-traite-non-proportionnel.component.html',
  styleUrls: ['./form-traite-non-proportionnel.component.scss']
})
export class FormTraiteNonProportionnelComponent implements OnInit {
  stepWizard : number = 3;  
  idTraitNonPropor :number =2;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  } 

  closeFormModal($event:boolean) {
    this.closeModal.emit(true);
  }

  gotoStepper($event : number) {
    this.stepWizard = $event;
  }

  receiveIdTraitNonPropor($event :number){
      this.idTraitNonPropor = $event 
  }

  ngOnInit(): void { 
  }

  ngOnDestroy() {
  }
 

}
