import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordSynchroreComponent } from './dashbord-synchrore.component';
import { DashbordAffaireFacultativeComponent } from './dashbord-affaire-facultative/dashbord-affaire-facultative.component';
import { DashbordAffaireTraiteComponent } from './dashbord-affaire-traite/dashbord-affaire-traite.component';
import { DashbordSinistreFacultativeComponent } from './dashbord-sinistre-facultative/dashbord-sinistre-facultative.component';

const routes: Routes = [
  {
    path:"",
    component:DashbordSynchroreComponent
  },
  {
    path:"affaire-facultative",
    component:DashbordAffaireFacultativeComponent
  },
  {
    path:"affaire-traite",
    component:DashbordAffaireTraiteComponent
  },
  {
    path:"sinistre-facultatif",
    component:DashbordSinistreFacultativeComponent
  },
  {
    path:"sinistre-traite",
    component:DashbordSinistreFacultativeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordSynchroreRoutingModule { }
