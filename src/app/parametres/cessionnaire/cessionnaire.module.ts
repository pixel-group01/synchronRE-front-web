import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CessionnaireRoutingModule } from './cessionnaire-routing.module';
import { Routes } from '@angular/router';
import { CessionnaireComponent } from './cessionnaire.component';


const routes: Routes = [ 
  {
    path: '',
    component: CessionnaireComponent
  }
];


@NgModule({
  declarations: [
   ],
  imports: [
    CommonModule,
    CessionnaireRoutingModule
  ]
})
export class CessionnaireModule { }
