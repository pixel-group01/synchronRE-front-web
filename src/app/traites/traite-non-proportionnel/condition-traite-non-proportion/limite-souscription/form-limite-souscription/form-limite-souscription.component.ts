import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-limite-souscription',
  templateUrl: './form-limite-souscription.component.html',
  styleUrls: ['./form-limite-souscription.component.scss']
})
export class FormLimiteSouscriptionComponent implements OnInit {

  
  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}