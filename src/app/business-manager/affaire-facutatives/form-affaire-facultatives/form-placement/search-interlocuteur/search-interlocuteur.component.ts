import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
    if(!this.idCessionnaire) return;

    this.busyGetSearch = this.interlocuteurService
    .getInterlocuteurByCesId(this.idCessionnaire)
    .subscribe((response : any) => {
      if (response) {
        if (response && response['content']) {
          this.ListeItems = response['content'] as Interlocuteur[];
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["idCessionnaire"] &&
      changes["idCessionnaire"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.getInterlocuteurByCessionnaire();
    }
  }
  
  ngOnInit(): void {
    this.getInterlocuteurByCessionnaire();
  }

}
