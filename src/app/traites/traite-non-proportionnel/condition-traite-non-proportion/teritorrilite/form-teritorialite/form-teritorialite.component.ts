import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-teritorialite',
  templateUrl: './form-teritorialite.component.html',
  styleUrls: ['./form-teritorialite.component.scss']
})
export class FormTeritorialiteComponent implements OnInit {
  listeExercices :any =[{}]
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
