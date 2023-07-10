import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FonctionnalitesComponent } from './fonctionnalites/fonctionnalites.component';
import { HistoriqueConnexionComponent } from './historique-connexion/historique-connexion.component';
import { RolesComponent } from './roles/roles.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { WorkflowCircuitComponent } from './workflow-circuit/workflow-circuit.component';
import { LogsComponent } from './logs/logs.component';
import { LogsSystemComponent } from './logs-system/logs-system.component';

const routes: Routes = [
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
  {
    path: 'utilisateurs',
    component: UtilisateursComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'fonctionnalites',
    component: FonctionnalitesComponent,
  },
  {
    path: 'circuit-validation',
    component: WorkflowCircuitComponent,
  },
  {
    path: 'historique-connexion',
    component: HistoriqueConnexionComponent,
  },
  {
    path: 'logs',
    component: LogsComponent,
  },
  {
    path: 'logs-system',
    component: LogsSystemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
