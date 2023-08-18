import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinistreRoutingModule } from './sinistre-routing.module';
import { ContainerSinistreComponent } from './container-sinistre/container-sinistre.component';
import { ListSinistreComponent } from './list-sinistre/list-sinistre.component';
import { SinistreComponent } from './sinistre.component';
import { FormSinistreComponent } from './form-sinistre/form-sinistre.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreationSinistreComponent } from './form-sinistre/creation-sinistre/creation-sinistre.component';
import { CreationDocumentSinistreComponent } from './form-sinistre/creation-document-sinistre/creation-document-sinistre.component';
import { FormRetournerSinstreComponent } from './list-sinistre/form-retourner-sinstre/form-retourner-sinstre.component';
import { AfficherMessageComponent } from './list-sinistre/afficher-message/afficher-message.component';
import { EtatComptableComponent } from './list-sinistre/etat-comptable/etat-comptable.component';
import { SharedModule } from '../shared/shared.module';
import { HistoriqueSinistreComponent } from './list-sinistre/historique-sinistre/historique-sinistre.component';

@NgModule({
  declarations: [
    SinistreComponent,
    ContainerSinistreComponent,
    // FormSinistreComponent,
    ListSinistreComponent,
    // CreationSinistreComponent,
    // CreationDocumentSinistreComponent,
    AfficherMessageComponent,
    // EtatComptableComponent
  ],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    SharedModule,
    SinistreRoutingModule
  ]
})
export class SinistreModule { }

