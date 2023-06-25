import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerSinistreComponent } from './container-sinistre/container-sinistre.component';

const routes: Routes = [
  {
    path: "declarations",
    component:ContainerSinistreComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinistreRoutingModule { }
