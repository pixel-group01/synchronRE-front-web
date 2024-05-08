import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-tranche',
  templateUrl: './form-tranche.component.html',
  styleUrls: ['./form-tranche.component.scss']
})
export class FormTrancheComponent implements OnInit {

  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}