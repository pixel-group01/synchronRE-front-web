import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';

@Component({
  selector: 'app-form-affaire-facultatives',
  templateUrl: './form-affaire-facultatives.component.html',
  styleUrls: ['./form-affaire-facultatives.component.scss']
})
export class FormAffaireFacultativesComponent implements OnInit {

  stepWizard : number = 3;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private businessOptionalService: BusinessOptionalService) { }

  closeFormModal($event:boolean) {
    this.closeModal.emit(true);
  }

  gotoStepper($event : number) {
    this.stepWizard = $event;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
   // On annule l'observable d'affaire facultative
   this.businessOptionalService.setCurrentOptionalBusiness(null);
  }
 
}
