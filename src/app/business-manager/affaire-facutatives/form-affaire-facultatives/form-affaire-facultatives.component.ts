import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-affaire-facultatives',
  templateUrl: './form-affaire-facultatives.component.html',
  styleUrls: ['./form-affaire-facultatives.component.scss']
})
export class FormAffaireFacultativesComponent implements OnInit {

  stepWizard : number = 1;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  closeFormModal($event:boolean) {
    this.closeModal.emit(true);
  }

  gotoStepper($event : number) {
    this.stepWizard = $event;
  }

  ngOnInit(): void {
  }
 
}
