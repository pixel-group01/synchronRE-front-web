import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.scss']
})
export class FormCategorieComponent implements OnInit {

  
  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
