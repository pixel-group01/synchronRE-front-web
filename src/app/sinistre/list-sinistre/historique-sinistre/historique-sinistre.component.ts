import { Component, Input, OnInit } from '@angular/core';
import { SinistreService } from 'src/app/core/service/sinistre.service';

@Component({
  selector: 'app-historique-sinistre',
  templateUrl: './historique-sinistre.component.html',
  styleUrls: ['./historique-sinistre.component.scss']
})
export class HistoriqueSinistreComponent implements OnInit {
  @Input() idSinistre : any;
  listeHistoriqueSinistre :any =[]
  constructor(private sinistreService: SinistreService) { }

  ngOnInit(): void {
    this.getHisto()
  }

  getHisto() {
    console.log("idSinistre :",this.idSinistre);
    this.sinistreService.getHistorique(this.idSinistre.sinId).subscribe((res: any) => {
        if(res){
          // console.log('message res ::',res.message,this.description);
         this.listeHistoriqueSinistre = res;
          
        }
    })
  }

}
