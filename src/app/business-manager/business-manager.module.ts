import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { BusinessManagerComponent } from './business-manager.component';
import { ContainerAffaireFacultativeComponent } from './affaire-facutatives/container-affaire-facultative/container-affaire-facultative.component';
// import { ListAffairesFacultativesComponent } from './affaire-facutatives/list-affaires-facultatives/list-affaires-facultatives.component';
import { SharedModule } from '../shared/shared.module';
// import { DetailsInformationIdentificationComponent } from './affaire-facutatives/form-affaire-facultatives/details-information-identification/details-information-identification.component';
import { ContainerAffaireTraiteeComponent } from './traites/container-affaire-traitee/container-affaire-traitee.component';
import { DemandePlacementComponent } from './traites/demande-placement/demande-placement.component';
import { DeclarationsSinistreComponent } from './traites/declarations-sinistre/declarations-sinistre.component';
import { ComptesComponent } from './comptes/comptes.component';
import { FormTrancheComponent } from './comptes/form-tranche/form-tranche.component';
// import { FormHistoriqueTraitementComponent } from './affaire-facutatives/form-affaire-facultatives/form-historique-traitement/form-historique-traitement.component';
// import { FormRetournerAffaireComponent } from './affaire-facutatives/form-affaire-facultatives/form-retourner-affaire/form-retourner-affaire.component';


@NgModule({
  declarations: [
    BusinessManagerComponent,
    ContainerAffaireFacultativeComponent,
    // FormAffaireFacultativesComponent,
    // FormIdentificationComponent,
    // FormRepartitionComponent, 
    // FormPlacementComponent,
    // DetailsInformationIdentificationComponent,
    ContainerAffaireTraiteeComponent,
    DemandePlacementComponent,
    DeclarationsSinistreComponent,
    ComptesComponent,
    FormTrancheComponent,
    // FormHistoriqueTraitementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessManagerRoutingModule
  ]
})
export class BusinessManagerModule { }
