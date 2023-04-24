import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BusinessOptional } from 'src/app/core/models/businessOptional';
import { RepartitionByTauxOrCapital } from 'src/app/core/models/repartitionByTauxOrCapital';
import { BusinessOptionalService } from 'src/app/core/service/business-optional.service';

@Component({
  selector: 'app-details-information-identification',
  templateUrl: './details-information-identification.component.html',
  styleUrls: ['./details-information-identification.component.scss']
})
export class DetailsInformationIdentificationComponent implements OnInit {

  currentAffaireFacultative : BusinessOptional = {
    "affId": 6,
    "affCode": null,
    "affAssure": "noglo koffi",
    "affActivite": "REASSUREUR",
    "affDateEffet": "2023-04-25",
    "affDateEcheance": "2023-04-29",
    "facNumeroPolice": null,
    affCapitalInitial: 30000000,
    "facSmpLci": null,
    "facPrime": null,
    "cedenteId": 2,
    "cedNomFiliale": "NSIA BN",
    "cedSigleFiliale": "NSIA BN",
    "statutCode": "SAI",
    couvertureId: 1,
    restARepartir: 30000000,
    "capitalDejaReparti": 0,
    "etatComptable": null
};;
  
  itemDetailsAffaire : any;
  @Input() currentRepartitionTaux!: RepartitionByTauxOrCapital;
  constructor(private businessOptionalService : BusinessOptionalService) { }

  getDetailsBussinessOptional(){
    // On verifie si il y a un business déjà crée
    if(!this.currentAffaireFacultative || !this.currentAffaireFacultative?.affId) {
      return
    }

    this.businessOptionalService.getDetailsAffaireFacultative(this.currentAffaireFacultative.affId).subscribe(
      (response) => {
         if (response) {
            this.itemDetailsAffaire = response;

            console.log(" this.itemDetailsAffaire ",this.itemDetailsAffaire);
            
          }
      }
    )
  }

  ngOnInit(): void {
    this.getDetailsBussinessOptional();

    if(this.businessOptionalService?.businessOptionalSubject$?.value){
      this.currentAffaireFacultative = {...this.businessOptionalService?.businessOptionalSubject$?.value};
    }
  }

    ngOnChanges(changes: SimpleChanges) {
    if (changes["currentRepartitionTaux"] && changes["currentRepartitionTaux"].currentValue) {
      this.currentRepartitionTaux = changes["currentRepartitionTaux"].currentValue;
    }
  }

}
