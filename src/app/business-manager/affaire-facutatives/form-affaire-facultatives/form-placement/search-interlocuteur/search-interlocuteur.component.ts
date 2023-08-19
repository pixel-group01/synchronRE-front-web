import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Interlocuteur } from 'src/app/core/models/interlocuteur';
import { InterlocuteurService } from 'src/app/core/service/interlocuteur.service';
import * as _ from "lodash";

@Component({
  selector: 'app-search-interlocuteur',
  templateUrl: './search-interlocuteur.component.html',
  styleUrls: ['./search-interlocuteur.component.scss']
})
export class SearchInterlocuteurComponent implements OnInit {

  busyGetSearch : Subscription;
  itemToSearch : any = {};
  ListeItems : Interlocuteur[];
  @Input() resetData : string;
  @Input() idCessionnaire : number;
  @Output() emitInterlocuteur: EventEmitter<any> = new EventEmitter();
  
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

  checkedInterlocuteur() {
    // Cette fonction sera en charge de recuperer les utilisateurs cochés et de les transferer au parent
    // let interlocuteursCheckeds = _.filter(this.ListeItems, function(o) { return (o.checked && o.isPrincipal) });
    let interlocuteursCheckeds = _.filter(this.ListeItems, function(o) { return (o.checked) });

    console.log(" checked ");
    
    if(interlocuteursCheckeds && interlocuteursCheckeds.length > 0) {
      this.emitInterlocuteur.emit(interlocuteursCheckeds);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["idCessionnaire"] &&
      changes["idCessionnaire"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.getInterlocuteurByCessionnaire();
    }

    if (
      changes["resetData"] &&
      changes["resetData"].currentValue
    ) {
      /** On reinitialise la pagination  */
      this.ListeItems = [];
    }

  }
  
  ngOnInit(): void {
    this.getInterlocuteurByCessionnaire();
  }

}
