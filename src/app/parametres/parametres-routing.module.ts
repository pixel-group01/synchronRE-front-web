import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { BankParameterComponent } from './bank-parameter/bank-parameter.component';
import { CountryParameterComponent } from './country-parameter/country-parameter.component';
import { StatutParameterComponent } from './statut-parameter/statut-parameter.component';
import { CessionLegalComponent } from './cession-legal/cession-legal.component';
import { BrancheParameterComponent } from './branche-parameter/branche-parameter.component';
import { CouvertureParameterComponent } from './couverture-parameter/couverture-parameter.component';
import { CedenteParameterComponent } from './cedente-parameter/cedente-parameter.component';
import { CessionnaireComponent } from './cessionnaire/cessionnaire.component';
// import {ExerciceComponent} from "./exercice-parameter/exercice/exercice.component";
const routes: Routes = [
  {
    path: 'sample',
    component: SampleComponent,
  },
  {
    path: 'bank',
    component: BankParameterComponent,
  },
  // {
  //   path: 'exercice',
  //   component: ExerciceComponent,
  // },
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
  {
    path: 'cedante',
    component: CedenteParameterComponent,
  },
  {
    path: 'cessionnaire',
    component: CessionnaireComponent,
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresRoutingModule {}
