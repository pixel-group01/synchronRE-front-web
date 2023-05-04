import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordSynchroreComponent } from './dashbord-synchrore.component';

const routes: Routes = [
  {
    path:"",
    component:DashbordSynchroreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordSynchroreRoutingModule { }
