import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashbordSynchroreRoutingModule } from './dashbord-synchrore-routing.module';
import { DashbordSynchroreComponent } from './dashbord-synchrore.component';
import { SharedModule } from '../shared/shared.module';
import { BlockStatistiqueComponent } from './block-statistique/block-statistique.component';
import { DashbordAffaireTraiteComponent } from './dashbord-affaire-traite/dashbord-affaire-traite.component';
import { DashbordAffaireFacultativeComponent } from './dashbord-affaire-facultative/dashbord-affaire-facultative.component';
import { DashbordSinistreTaiteComponent } from './dashbord-sinistre-taite/dashbord-sinistre-taite.component';
import { DashbordSinistreFacultativeComponent } from './dashbord-sinistre-facultative/dashbord-sinistre-facultative.component';
import { DataSinistreFacultativeComponent } from './dashbord-sinistre-facultative/data-sinistre-facultative/data-sinistre-facultative.component';
import { ChartModule } from 'angular-highcharts';
import { ListeStatistiqueFacComponent } from './dashbord-affaire-facultative/liste-statistique-fac/liste-statistique-fac.component';


@NgModule({
  declarations: [
    DashbordSynchroreComponent,
    BlockStatistiqueComponent,
    DashbordAffaireTraiteComponent,
    DashbordAffaireFacultativeComponent,
    DashbordSinistreTaiteComponent,
    DashbordSinistreFacultativeComponent,
    DataSinistreFacultativeComponent,
    ListeStatistiqueFacComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    SharedModule,
    DashbordSynchroreRoutingModule
  ],
})
export class DashbordSynchroreModule { }
