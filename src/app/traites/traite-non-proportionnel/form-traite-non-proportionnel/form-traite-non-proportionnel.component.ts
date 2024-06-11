import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-traite-non-proportionnel',
  templateUrl: './form-traite-non-proportionnel.component.html',
  styleUrls: ['./form-traite-non-proportionnel.component.scss']
})
export class FormTraiteNonProportionnelComponent implements OnInit {
  stepWizard : number = 1;  
  idTraitNonPropor :number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() currentTraiterNonPropo :any;
  @Input() numStep :number
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
      console.log("receiveIdTraitNonPropor  ::",this.idTraitNonPropor); 
  } 

  ngOnInit(): void { 
    if (this.numStep) {
        this.stepWizard = this.numStep;
        // console.log("currentTraiterNonPropo ::", this.currentTraiterNonPropo);
    }
  }

  ngOnDestroy() {
  }
 

}
