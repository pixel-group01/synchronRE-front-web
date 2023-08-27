import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SinistreService } from 'src/app/core/service/sinistre.service';

@Component({
  selector: 'app-historique-sinistre',
  templateUrl: './historique-sinistre.component.html',
  styleUrls: ['./historique-sinistre.component.scss']
})
export class HistoriqueSinistreComponent implements OnInit {
  @Input() idSinistre : any;
  listeHistoriqueSinistre :any =[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;
  busyGet: Subscription;

  constructor(private sinistreService: SinistreService) { }

  ngOnInit(): void {
    this.getHisto()
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getHisto();
  }


  changePaginationSize($event) {
    if ($event) {
      this.currentPage = 1;
      this.itemsPerPage = parseInt($event);
    }
    this.getHisto();
  }

  getHisto() {
    console.log("idSinistre :",this.idSinistre);
    this.sinistreService.getHistorique(this.idSinistre.sinId).subscribe((res: any) => {
          console.log('histo res 0::',res);
          if (res && res['content']) {
            this.listeHistoriqueSinistre = res['content'] ;
            this.totalItems = res['totalElements'];
          } 
        else {
          this.listeHistoriqueSinistre = [];
          this.totalItems = 0;
        }
    })
  }

}
