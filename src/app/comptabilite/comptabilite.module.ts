import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { ComptabiliteComponent } from './comptabilite.component';
import { SharedModule } from '../shared/shared.module';
import { ListAffaireEnComptabiliteComponent } from './list-affaire-en-comptabilite/list-affaire-en-comptabilite.component';
import { AffairesFacultativeComponent } from './affaires-facultative/affaires-facultative.component';
import { PaiementsAffairesComponent } from './affaires-facultative/paiements-affaires/paiements-affaires.component';
import { ReversementsAffaireComponent } from './affaires-facultative/reversements-affaire/reversements-affaire.component';
import { FormPaiementComponent } from './affaires-facultative/paiements-affaires/form-paiement/form-paiement.component';


@NgModule({
  declarations: [
    ComptabiliteComponent,
    ListAffaireEnComptabiliteComponent,
    AffairesFacultativeComponent, 
    PaiementsAffairesComponent,
    ReversementsAffaireComponent,
    FormPaiementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComptabiliteRoutingModule
  ]
})
export class ComptabiliteModule { }
