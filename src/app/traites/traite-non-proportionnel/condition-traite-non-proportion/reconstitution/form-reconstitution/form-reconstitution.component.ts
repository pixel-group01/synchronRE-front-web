import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-reconstitution',
  templateUrl: './form-reconstitution.component.html',
  styleUrls: ['./form-reconstitution.component.scss']
})
export class FormReconstitutionComponent implements OnInit {

  
  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
