import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSinistreRoutingModule } from './form-sinistre-routing.module';
import { CreationSinistreComponent } from './creation-sinistre/creation-sinistre.component';
import { CreationDocumentSinistreComponent } from './creation-document-sinistre/creation-document-sinistre.component';
import { FormSinistreComponent } from './form-sinistre.component';


@NgModule({
  declarations: [
    CreationSinistreComponent,
    CreationDocumentSinistreComponent
  ],
  imports: [
    CommonModule,
    FormSinistreRoutingModule
  ]
})
export class FormSinistreModule { }
