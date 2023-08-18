import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Interlocuteur } from 'src/app/core/models/interlocuteur';
import { InterlocuteurService } from 'src/app/core/service/interlocuteur.service';

@Component({
  selector: 'app-search-interlocuteur',
  templateUrl: './search-interlocuteur.component.html',
  styleUrls: ['./search-interlocuteur.component.scss']
})
export class SearchInterlocuteurComponent implements OnInit {

  busyGetSearch : Subscription;
  itemToSearch : any = {};
  ListeItems : Interlocuteur[];
  @Input() idCessionnaire : number;
  
  constructor( private interlocuteurService: InterlocuteurService) { }

  getInterlocuteurByCessionnaire() {
    this.busyGetSearch = this.interlocuteurService
    .getInterlocuteurByCesId(this.idCessionnaire)
    .subscribe((response : any) => {
      if (response) {
        this.ListeItems = response;
      }
    });
  }

  ngOnInit(): void {
    this.getInterlocuteurByCessionnaire();
  }

}
