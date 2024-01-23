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
import { CountryParameterComponent } from './country-parameter/country-parameter.component';
import { FormCountryComponent } from './country-parameter/form-country/form-country.component';
import { StatutParameterComponent } from './statut-parameter/statut-parameter.component';
import { FormStatutComponent } from './statut-parameter/form-statut/form-statut.component';
import { CessionLegalComponent } from './cession-legal/cession-legal.component';
import { CouvertureParameterComponent } from './couverture-parameter/couverture-parameter.component';
import { BrancheParameterComponent } from './branche-parameter/branche-parameter.component';
import { FormBranchParameterComponent } from './branche-parameter/form-branch-parameter/form-branch-parameter.component';
import { FormCouvertureComponent } from './couverture-parameter/form-couverture/form-couverture.component';
import { FormCessionComponent } from './cession-legal/form-cession/form-cession.component';
import { CedenteParameterComponent } from './cedente-parameter/cedente-parameter.component';
import { FormCedenteComponent } from './cedente-parameter/form-cedente/form-cedente.component';
import { CessionnaireComponent } from './cessionnaire/cessionnaire.component';
import { FormCessionaireComponent } from './cessionnaire/form-cessionaire/form-cessionaire.component';
import { FormAddInterlocuteurComponent } from './cessionnaire/form-add-interlocuteur/form-add-interlocuteur.component';
import { ExerciceComponent } from './exercice-parameter/exercice/exercice.component';

@NgModule({
  declarations: [
    SampleComponent,
    BankParameterComponent,
    FormBankComponent,
    CountryParameterComponent,
    FormCountryComponent,
    StatutParameterComponent,
    FormStatutComponent,
    CessionLegalComponent,
    CouvertureParameterComponent,
    BrancheParameterComponent,
    FormBranchParameterComponent,
    FormCouvertureComponent,
    FormCessionComponent,
    CedenteParameterComponent,
    FormCedenteComponent,
    CessionnaireComponent,
    FormCessionaireComponent,
    FormAddInterlocuteurComponent,
    ExerciceComponent,
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
