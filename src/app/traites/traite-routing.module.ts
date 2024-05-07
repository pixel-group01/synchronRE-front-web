import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraiteProportionnelComponent } from './traite-proportionnel/traite-proportionnel.component';
import { TraiteNonProportionnelComponent } from './traite-non-proportionnel/traite-non-proportionnel.component';

const routes: Routes = [
  {
    path:'traites-proportionnel',
    component:TraiteProportionnelComponent
  },
  {
    path:'traites-non-proportionnel',
    component:TraiteNonProportionnelComponent
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
export class TraiteRoutingModule { }
