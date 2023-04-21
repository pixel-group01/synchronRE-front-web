import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { BusinessManagerComponent } from './business-manager.component';
import { ContainerAffaireFacultativeComponent } from './affaire-facutatives/container-affaire-facultative/container-affaire-facultative.component';
import { ListAffairesFacultativesComponent } from './affaire-facutatives/list-affaires-facultatives/list-affaires-facultatives.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BusinessManagerComponent,
    ContainerAffaireFacultativeComponent,
    ListAffairesFacultativesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusinessManagerRoutingModule
  ]
})
export class BusinessManagerModule { }
