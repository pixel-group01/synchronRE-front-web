import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraiteRoutingModule } from './traite-routing.module';
import { TraitesComponent } from './traites.component';
import { TraiteProportionnelComponent } from './traite-proportionnel/traite-proportionnel.component';
import { TraiteNonProportionnelComponent } from './traite-non-proportionnel/traite-non-proportionnel.component';
import { SharedModule } from '../shared/shared.module';
import { ListeTraitesNonProportionnelComponent } from './traite-non-proportionnel/liste-traites-non-proportionnel/liste-traites-non-proportionnel.component';
import { FormTraiteNonProportionnelComponent } from './traite-non-proportionnel/form-traite-non-proportionnel/form-traite-non-proportionnel.component';
import { ConditionTraiteNonProportionComponent } from './traite-non-proportionnel/condition-traite-non-proportion/condition-traite-non-proportion.component';
import { RepartitionTraiteNonProportionComponent } from './traite-non-proportionnel/repartition-traite-non-proportion/repartition-traite-non-proportion.component';
import { InformationGeneralTraiteNonProportionComponent } from './traite-non-proportionnel/information-general-traite-non-proportion/information-general-traite-non-proportion.component';
import { TeritorriliteComponent } from './traite-non-proportionnel/condition-traite-non-proportion/teritorrilite/teritorrilite.component';
import { RisqueCouvertsComponent } from './traite-non-proportionnel/condition-traite-non-proportion/risque-couverts/risque-couverts.component';
import { CategorieComponent } from './traite-non-proportionnel/condition-traite-non-proportion/categorie/categorie.component';
import { AssietePrimeComponent } from './traite-non-proportionnel/condition-traite-non-proportion/assiete-prime/assiete-prime.component';
import { TrancheComponent } from './traite-non-proportionnel/condition-traite-non-proportion/tranche/tranche.component';
import { LimiteSouscriptionComponent } from './traite-non-proportionnel/condition-traite-non-proportion/limite-souscription/limite-souscription.component';
import { SousLimiteComponent } from './traite-non-proportionnel/condition-traite-non-proportion/sous-limite/sous-limite.component';
import { ReconstitutionComponent } from './traite-non-proportionnel/condition-traite-non-proportion/reconstitution/reconstitution.component';
import { FormTraiteNonProportionStep3Component } from './traite-non-proportionnel/repartition-traite-non-proportion/form-traite-non-proportion-step3/form-traite-non-proportion-step3.component';
import { FormTeritorialiteComponent } from './traite-non-proportionnel/condition-traite-non-proportion/teritorrilite/form-teritorialite/form-teritorialite.component';
import { FormRisqueCouvertsComponent } from './traite-non-proportionnel/condition-traite-non-proportion/risque-couverts/form-risque-couverts/form-risque-couverts.component';
import { FormCategorieComponent } from './traite-non-proportionnel/condition-traite-non-proportion/categorie/form-categorie/form-categorie.component';
import { FormTrancheComponent } from './traite-non-proportionnel/condition-traite-non-proportion/tranche/form-tranche/form-tranche.component';
import { FormLimiteSouscriptionComponent } from './traite-non-proportionnel/condition-traite-non-proportion/limite-souscription/form-limite-souscription/form-limite-souscription.component';
import { FormSousLimiteComponent } from './traite-non-proportionnel/condition-traite-non-proportion/sous-limite/form-sous-limite/form-sous-limite.component';
import { FormReconstitutionComponent } from './traite-non-proportionnel/condition-traite-non-proportion/reconstitution/form-reconstitution/form-reconstitution.component';
import { FormAssietePrimeComponent } from './traite-non-proportionnel/condition-traite-non-proportion/assiete-prime/form-assiete-prime/form-assiete-prime.component';


@NgModule({
  declarations: [
    TraitesComponent,
    TraiteProportionnelComponent,
    TraiteNonProportionnelComponent,
    ListeTraitesNonProportionnelComponent,
    FormTraiteNonProportionnelComponent,
    ConditionTraiteNonProportionComponent,
    RepartitionTraiteNonProportionComponent,
    InformationGeneralTraiteNonProportionComponent,
    TeritorriliteComponent,
    RisqueCouvertsComponent,
    CategorieComponent,
    AssietePrimeComponent,
    TrancheComponent,
    LimiteSouscriptionComponent,
    SousLimiteComponent,
    ReconstitutionComponent,
    FormTraiteNonProportionStep3Component,
    FormTeritorialiteComponent,
    FormRisqueCouvertsComponent,
    FormCategorieComponent,
    FormTrancheComponent,
    FormLimiteSouscriptionComponent,
    FormSousLimiteComponent,
    FormReconstitutionComponent,
    FormAssietePrimeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TraiteRoutingModule
  ]
  
})
export class TraiteModule { }
