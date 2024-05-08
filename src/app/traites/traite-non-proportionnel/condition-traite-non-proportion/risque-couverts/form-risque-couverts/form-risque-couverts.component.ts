import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-risque-couverts',
  templateUrl: './form-risque-couverts.component.html',
  styleUrls: ['./form-risque-couverts.component.scss']
})
export class FormRisqueCouvertsComponent implements OnInit {
  listeExercices :any =[{}];
  risqueListe : any = [
    {risqueLibelle  : 'Centre commerciaux'},
    { orgLibelle  : 'CEDEAO'}
  ];
  activiteListe : any = [
    {actLibelle  : 'Centre commerciaux A'},
    { orgLibelle  : 'CEDEAO'}
  ];
  itemToSave :any
  constructor() { }

  ngOnInit(): void {
  }

  confirmSaveItem(item:any){}
}
