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
  @Input() oldInterlocuteur : Interlocuteur[];
  @Output() emitInterlocuteur: EventEmitter<any> = new EventEmitter();
  
  constructor( private interlocuteurService: InterlocuteurService) { }

  getInterlocuteurByCessionnaire() {

    console.log(" this.idCessionnaire ",this.idCessionnaire);
    
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
   this.emitValue();
  }

  emitValue() {
    let interlocuteursCheckeds = _.filter(this.ListeItems, function(o) { return (o.checked || o.hasPrincipal) });

    if(interlocuteursCheckeds && interlocuteursCheckeds.length > 0) {
      this.emitInterlocuteur.emit(interlocuteursCheckeds);
    }
  }

  checkStatus($event:any,item:Interlocuteur) {

    this.ListeItems.forEach((element : any) => {
      element.hasPrincipal = false;
    });
    
    if(event.target['checked'] == true){
      
      // // Get checked radio button's value
      // let radioValue = event.target['value'];
      item['hasPrincipal'] = true;
      this.emitValue();
    }
  }

  crossOldInterlocuteur(listInterlocuteur?:Interlocuteur[]) {
    
    this.ListeItems.forEach((item : Interlocuteur) => {
      let oldItem = _.find(this.oldInterlocuteur, (o : Interlocuteur) => { return o.intId === item.intId });
      if(oldItem) {
        item.checked = oldItem.selected;
        item.hasPrincipal = oldItem.principal;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(" idCessionnaire ",changes); 
    
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

    if(  changes["oldInterlocuteur"] &&
    changes["oldInterlocuteur"].currentValue && changes["oldInterlocuteur"].currentValue.length > 0) {
      // On doit faire un croisement pour recuperer les ancien intem
      this.crossOldInterlocuteur(changes["oldInterlocuteur"].currentValue);
    }
  }
  
  ngOnInit(): void {
    console.log(" je suis dans le oninit");
    
    this.getInterlocuteurByCessionnaire();
  }

}
