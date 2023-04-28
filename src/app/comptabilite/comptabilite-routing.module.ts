import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiementsComponent } from './affaires-facultative/paiements/paiements.component';
import { ReversementsComponent } from './affaires-facultative/reversements/reversements.component';

const routes: Routes = [
  {
    path:'paiement',
    component:PaiementsComponent
  },
  {
    path:'reversement',
    component:ReversementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptabiliteRoutingModule { }
