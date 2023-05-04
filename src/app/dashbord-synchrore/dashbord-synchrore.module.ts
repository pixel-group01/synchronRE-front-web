import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordSynchroreRoutingModule } from './dashbord-synchrore-routing.module';
import { DashbordSynchroreComponent } from './dashbord-synchrore.component';
import { SharedModule } from '../shared/shared.module';
import { BlockStatistiqueComponent } from './block-statistique/block-statistique.component';


@NgModule({
  declarations: [
    DashbordSynchroreComponent,
    BlockStatistiqueComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashbordSynchroreRoutingModule
  ]
})
export class DashbordSynchroreModule { }
