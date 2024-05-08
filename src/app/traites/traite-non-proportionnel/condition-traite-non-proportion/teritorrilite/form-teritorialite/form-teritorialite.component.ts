import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-teritorialite',
  templateUrl: './form-teritorialite.component.html',
  styleUrls: ['./form-teritorialite.component.scss']
})
export class FormTeritorialiteComponent implements OnInit {
  listeExercices :any =[{}];
  organisationListe : any = [
    {orgLibelle  : 'CIMA'},
    { orgLibelle  : 'CEDEAO'}
  ];
  paysListe : any = [
    {payLibelle  : "Cote d'Ivoire"},
    {payLibelle  : "Burkina Faso"},
    {payLibelle  : "Guinnée"},
    { payLibelle  : 'Mali'}
  ];
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
