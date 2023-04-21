import { Component, OnInit } from '@angular/core';
import { enumStatutAffaire } from 'src/app/core/enumerator/enumerator';

@Component({
  selector: 'app-container-affaire-facultative',
  templateUrl: './container-affaire-facultative.component.html',
  styleUrls: ['./container-affaire-facultative.component.scss']
})
export class ContainerAffaireFacultativeComponent implements OnInit {

  statutAffaire : any = {}
  constructor() {
    this.statutAffaire = enumStatutAffaire;
  }

  ngOnInit(): void {
  }

}
