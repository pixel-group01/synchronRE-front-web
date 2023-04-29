import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { ComptabiliteComponent } from './comptabilite.component';
import { PaiementsComponent } from './affaires-facultative/paiements/paiements.component';
import { ReversementsComponent } from './affaires-facultative/reversements/reversements.component';
import { SharedModule } from '../shared/shared.module';
import { ListAffaireEnComptabiliteComponent } from './list-affaire-en-comptabilite/list-affaire-en-comptabilite.component';


@NgModule({
  declarations: [
    ComptabiliteComponent,
    PaiementsComponent,
    ReversementsComponent,
    ListAffaireEnComptabiliteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComptabiliteRoutingModule
  ]
})
export class ComptabiliteModule { }
