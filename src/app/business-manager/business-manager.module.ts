import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessManagerRoutingModule } from './business-manager-routing.module';
import { BusinessManagerComponent } from './business-manager.component';


@NgModule({
  declarations: [
    BusinessManagerComponent
  ],
  imports: [
    CommonModule,
    BusinessManagerRoutingModule
  ]
})
export class BusinessManagerModule { }
