import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { BankParameterComponent } from './bank-parameter/bank-parameter.component';
import { CountryParameterComponent } from './country-parameter/country-parameter.component';
import { StatutParameterComponent } from './statut-parameter/statut-parameter.component';
import { CessionLegalComponent } from './cession-legal/cession-legal.component';
import { BrancheParameterComponent } from './branche-parameter/branche-parameter.component';
import { CouvertureParameterComponent } from './couverture-parameter/couverture-parameter.component';
const routes: Routes = [
  {
    path: 'sample',
    component: SampleComponent,
  },
  {
    path: 'bank',
    component: BankParameterComponent,
  },
  {
    path: 'country',
    component: CountryParameterComponent,
  },
  {
    path: 'statut',
    component: StatutParameterComponent,
  },
  {
    path: 'cession-legal',
    component: CessionLegalComponent,
  },
  {
    path: 'branche',
    component: BrancheParameterComponent,
  },
  {
    path: 'couverture',
    component: CouvertureParameterComponent,
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresRoutingModule {}
