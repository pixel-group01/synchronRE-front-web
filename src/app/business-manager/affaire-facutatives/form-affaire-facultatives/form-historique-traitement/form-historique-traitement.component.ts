import { Component, OnInit } from '@angular/core';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { HistoriqueTraitement } from 'src/app/core/models/historiqueTraitement';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';

@Component({
  selector: 'app-form-historique-traitement',
  templateUrl: './form-historique-traitement.component.html',
  styleUrls: ['./form-historique-traitement.component.scss']
})
export class FormHistoriqueTraitementComponent implements OnInit {

  currentAffaire : BusinessOptional;
  listeHistoriqueTraitement : HistoriqueTraitement[] = [];
  
  constructor(private businessOptional:BusinessOptionalService) { }

  getHistoriqueTraitement() {
    this.businessOptional.getMouvementAffaire(this.currentAffaire?.affId).subscribe(
      (response : any) => {
        console.log(" response ",response);
        this.listeHistoriqueTraitement = response as HistoriqueTraitement[];
      }
    )
  }

  ngOnInit(): void {
    this.currentAffaire = this.businessOptional.businessOptionalSubject$.value;
    this.getHistoriqueTraitement();
  }

}
