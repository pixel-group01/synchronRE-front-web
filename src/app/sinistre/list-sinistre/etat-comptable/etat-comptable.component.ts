import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { SinistreService } from 'src/app/core/service/sinistre.service';

@Component({
  selector: 'app-etat-comptable',
  templateUrl: './etat-comptable.component.html',
  styleUrls: ['./etat-comptable.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }]

})
export class EtatComptableComponent implements OnInit {
  @Input() idSinistre : number;
  etatComp :any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor(private sinistreService: SinistreService) { }

  ngOnInit(): void {
    this.etatComptable()
  }

  fermer(){
    this.closeModal.emit(true);
  }

  getExactlyNumberRow(page, index) {
    let num = index + 1;
    if (page > 1) {
      num = (page - 1) * 10 + (index + 1);
    }
    return num;
  }

  etatComptable(){
    this.sinistreService.etatComptable(this.idSinistre).subscribe((res:any)=>{
      console.log("res res ::", res);
      this.etatComp = res
    })
  }


}
