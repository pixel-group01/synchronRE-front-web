import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffairesFacultativeComponent } from './affaires-facultative/affaires-facultative.component';

const routes: Routes = [
  {
    path:'affaires',
    component:AffairesFacultativeComponent
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
