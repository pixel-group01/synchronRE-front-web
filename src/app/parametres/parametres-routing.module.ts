import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { BankParameterComponent } from './bank-parameter/bank-parameter.component';
const routes: Routes = [
  {
    path: 'sample',
    component: SampleComponent,
  },
  {
    path: 'bank',
    component: BankParameterComponent,
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresRoutingModule {}
