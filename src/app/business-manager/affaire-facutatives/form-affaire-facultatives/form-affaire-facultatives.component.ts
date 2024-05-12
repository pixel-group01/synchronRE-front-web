import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-form-affaire-facultatives',
  templateUrl: './form-affaire-facultatives.component.html',
  styleUrls: ['./form-affaire-facultatives.component.scss']
})
export class FormAffaireFacultativesComponent implements OnInit {

  stepWizard : number = 1;  
  user : User;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private businessOptionalService: BusinessOptionalService, private userService:UserService) {
    this.user = this.userService.getCurrentUserInfo();
  }

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
