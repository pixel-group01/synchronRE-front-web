import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CedanteService } from 'src/app/core/service/cedante.service';

@Component({
  selector: 'app-form-tranche',
  templateUrl: './form-tranche.component.html',
  styleUrls: ['./form-tranche.component.scss']
})
export class FormTrancheComponent implements OnInit {

  itemToSave : any = {};
  ListeCedantes : any = [];
  Liste : any = [];
  ListeCessionnaires : any = [];
  ListeDesignations : any = [];

  @Input() currentTranche : any;
  
  constructor(private cedenteService: CedanteService) { }


  // getCedante() {
  //   this.cedenteService.getAll().subscribe(
  //     (response : any) => {
  //       console.log("response ",response);
  //       if(response && response.length) {
  //         this.ListeCedantes = response;
  //       }
  //     }
  //   )
  // }
 

  ngOnInit(): void {
    // this.getCedante();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["currentTranche"] && changes["currentTranche"].currentValue) {
      if(this.currentTranche?.compteDetails) {
        this.ListeDesignations = this.currentTranche?.compteDetails || [];
      }

      if(this.currentTranche?.compteCessionnaires) {
        this.ListeCessionnaires = this.currentTranche?.compteCessionnaires || [];
      }

      if(this.currentTranche?.cedantes) {
        this.ListeCedantes = this.currentTranche?.cedantes;
      }
    }
  }

}
