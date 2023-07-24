import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffairesFacultativeComponent } from './affaires-facultative/affaires-facultative.component';
import { SinistreComptaComponent } from './sinistre-compta/sinistre-compta.component';

const routes: Routes = [
  {
    path:'affaires',
    component:AffairesFacultativeComponent
  },
  {
    path:'sinistres',
    component:SinistreComptaComponent
  },
  // {
  //   path:'reversement',
  //   component:ReversementsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptabiliteRoutingModule { }
