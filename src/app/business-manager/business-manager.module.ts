import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { BusinessManagerComponent } from './business-manager.component';
import { ContainerAffaireFacultativeComponent } from './affaire-facutatives/container-affaire-facultative/container-affaire-facultative.component';
import { ListAffairesFacultativesComponent } from './affaire-facutatives/list-affaires-facultatives/list-affaires-facultatives.component';
import { SharedModule } from '../shared/shared.module';
import { FormAffaireFacultativesComponent } from './affaire-facutatives/form-affaire-facultatives/form-affaire-facultatives.component';
import { FormIdentificationComponent } from './affaire-facutatives/form-affaire-facultatives/form-identification/form-identification.component';
import { FormRepartitionComponent } from './affaire-facutatives/form-affaire-facultatives/form-repartition/form-repartition.component';
import { FormPlacementComponent } from './affaire-facutatives/form-affaire-facultatives/form-placement/form-placement.component';
import { DetailsInformationIdentificationComponent } from './affaire-facutatives/form-affaire-facultatives/details-information-identification/details-information-identification.component';


@NgModule({
  declarations: [
    BusinessManagerComponent,
    ContainerAffaireFacultativeComponent,
    ListAffairesFacultativesComponent,
    FormAffaireFacultativesComponent,
    FormIdentificationComponent,
    FormRepartitionComponent,
    FormPlacementComponent,
    DetailsInformationIdentificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessManagerRoutingModule
  ]
})
export class BusinessManagerModule { }
