import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSinistreComponent } from './form-sinistre.component';
import { CreationSinistreComponent } from './creation-sinistre/creation-sinistre.component';
import { CreationDocumentSinistreComponent } from './creation-document-sinistre/creation-document-sinistre.component';

const routes: Routes = [
  {
    path: '',
    component: FormSinistreComponent,
    children: [
      {
        path: '',
        redirectTo: 'creation',
        pathMatch: 'full'
      },
      {
        path: 'creation',
        component: CreationSinistreComponent,
      },  
      {
        path: 'document-sinistre',
        component: CreationDocumentSinistreComponent,
      },
     
    ]
  } 
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormSinistreRoutingModule { }
