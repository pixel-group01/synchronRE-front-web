import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeCessionnaireComponent } from './liste-cessionnaire/liste-cessionnaire.component';
import { InterlocuteursComponent } from './interlocuteurs/interlocuteurs.component';
import { CessionnaireComponent } from './cessionnaire.component';


const routes: Routes = [
  {
    path: '',
    component: CessionnaireComponent,
    children: [
      {
        path: '',
        redirectTo: 'liste-cessionnaire',
        pathMatch: 'full'
      },
      {
        path: 'liste-cessionnaire',
        component: ListeCessionnaireComponent,
      },  
      {
        path: 'interlocuteur/:id',
        component: InterlocuteursComponent,
      },
      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CessionnaireRoutingModule { }
