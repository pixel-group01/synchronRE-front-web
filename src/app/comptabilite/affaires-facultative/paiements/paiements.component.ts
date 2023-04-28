import { Component, OnInit } from '@angular/core';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.scss']
})
export class PaiementsComponent implements OnInit {

  statutAffaire : any = {};

  constructor() { 
    this.statutAffaire = enumStatutAffaire;
  }

  ngOnInit(): void {
  }

}
