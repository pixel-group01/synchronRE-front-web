import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-placement',
  templateUrl: './form-placement.component.html',
  styleUrls: ['./form-placement.component.scss']
})
export class FormPlacementComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() stepperInice: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  gotoPreviousStep() {
    this.stepperInice.emit(2);
  }

  ngOnInit(): void {
  }

}
