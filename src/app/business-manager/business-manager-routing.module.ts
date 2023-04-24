import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerAffaireFacultativeComponent } from './affaire-facutatives/container-affaire-facultative/container-affaire-facultative.component';
import { ContainerAffaireTraiteeComponent } from './traites/container-affaire-traitee/container-affaire-traitee.component';

const routes: Routes = [
  {
    path: "affaire-facultatives",
    component:ContainerAffaireFacultativeComponent
  },
  {
    path: "affaire-traitee",
    component:ContainerAffaireTraiteeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessManagerRoutingModule { }
