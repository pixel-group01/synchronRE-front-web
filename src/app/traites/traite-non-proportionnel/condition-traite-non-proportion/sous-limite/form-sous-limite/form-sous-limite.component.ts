import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-sous-limite',
  templateUrl: './form-sous-limite.component.html',
  styleUrls: ['./form-sous-limite.component.scss']
})
export class FormSousLimiteComponent implements OnInit {

  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
