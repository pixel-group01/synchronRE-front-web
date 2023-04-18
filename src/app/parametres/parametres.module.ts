import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleComponent } from "./sample/sample.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ComponentsModule } from "../shared/components/components.module";
import { ParametresRoutingModule } from "./parametres-routing.module";
import { SharedModule } from "../shared/shared.module";
import { BankParameterComponent } from './bank-parameter/bank-parameter.component';
import { FormBankComponent } from './bank-parameter/form-bank/form-bank.component';
import { BankService } from "../core/service/bank.service";

@NgModule({
  declarations: [
    SampleComponent,
    BankParameterComponent,
    FormBankComponent,
  ],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ComponentsModule,
    SharedModule,
  ],
  providers:[]
})
export class ParametresModule {}
