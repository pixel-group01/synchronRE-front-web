import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerArchivesComponent } from './container-archives/container-archives.component';

const routes: Routes = [
  {
    path:'',
    component:ContainerArchivesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesRoutingModule { }
