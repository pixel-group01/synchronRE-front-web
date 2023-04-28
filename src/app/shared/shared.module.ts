import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormArray, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { NgxMaskModule } from "ngx-mask";
import { NgBusyModule } from "ng-busy";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { MoneyFormatPipe } from "../core/pipes/money-format.pipe";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SearchPatientComponent } from "./components/search-patient/search-patient.component";
import { MainListeAccueilByEtapeComponent } from "./components/main-liste-accueil-by-etape/main-liste-accueil-by-etape.component";
import { AddDocumentComponent } from "./components/add-document/add-document.component";
import { SearchMedicamentComponent } from "./components/search-medicament/search-medicament.component";
import { CKEditorModule } from "ng2-ckeditor";
import { MatTabsModule } from "@angular/material/tabs";
import { DetailsDocumentsJointsComponent } from "./components/details-documents-joints/details-documents-joints.component";
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormPreviewPdfComponent } from "./components/form-preview-pdf/form-preview-pdf.component";
import { HistoriqueCircuitTraitementComponent } from "./components/historique-circuit-traitement/historique-circuit-traitement.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { SearchMedocByUniteFonctionnelleComponent } from "./components/search-medoc-by-unite-fonctionnelle/search-medoc-by-unite-fonctionnelle.component";
import { ElementByPagePaginatorComponent } from "./components/element-by-page-paginator/element-by-page-paginator.component";
import { TimePickerComponent } from "./components/time-picker/time-picker.component";
import { MainListeAccueilDialyseByEtapeComponent } from "./components/main-liste-accueil-dialyse-by-etape/main-liste-accueil-dialyse-by-etape.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { PopoverModule } from "ngx-bootstrap/popover";
import { PosologiePrescriptionComponent } from "./components/posologie-prescription/posologie-prescription.component";
import { TimeLineComponent } from "./components/time-line/time-line.component";
import { PriseDeDecisionWorkflowComponent } from "./components/prise-de-decision-workflow/prise-de-decision-workflow.component";
import { AppAccessDirective } from "./directive/app-access.directive";
import { ChartModule } from 'angular-highcharts';
import { ListAffairesFacultativesComponent } from "../business-manager/affaire-facutatives/list-affaires-facultatives/list-affaires-facultatives.component";


@NgModule({
  declarations: [
    MoneyFormatPipe,
    SearchPatientComponent,
    MainListeAccueilByEtapeComponent,  
    AddDocumentComponent,
    SearchMedicamentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    HistoriqueCircuitTraitementComponent,
    SearchMedocByUniteFonctionnelleComponent,
    ElementByPagePaginatorComponent,
    TimePickerComponent,
    MainListeAccueilDialyseByEtapeComponent,
    PosologiePrescriptionComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    AppAccessDirective,
    // ProgrammeDialyseComponent,
    // FormCreateProgrammeComponent,
    // ProgrammeDialyseAgendaComponent,
    // HistoriqueProgrammeDialyseComponent,
    // DetailsPatientsProgrammeComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgBusyModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatTabsModule,
    NgSelectModule,
    FullCalendarModule, 
    MatIconModule,
    MatButtonModule,
    CKEditorModule,
    ChartModule,
    PopoverModule.forRoot(),
   
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'red',
      switchColor: 'white',
      defaultBgColor: 'green',
      defaultBoColor : '#476EFF',
      checkedLabel: 'Inactif',
      uncheckedLabel: 'Actif',
      checkedTextColor:'white',
      uncheckedTextColor:'white'
    }),
  ],
  exports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    NgBusyModule,
    PaginationModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    PopoverModule,
    // PaginationModule.forRoot(),
    // NgxMaskModule,
    MoneyFormatPipe,
    BsDatepickerModule,
    SearchPatientComponent,
    MainListeAccueilByEtapeComponent,
    AddDocumentComponent,
    SearchMedicamentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    UiSwitchModule,
    NgSelectModule,
    FullCalendarModule,
    NgbModule,
    HistoriqueCircuitTraitementComponent,
    SearchMedocByUniteFonctionnelleComponent,
    ElementByPagePaginatorComponent,
    TimePickerComponent ,
    MainListeAccueilDialyseByEtapeComponent,
    PosologiePrescriptionComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    // ListAffairesFacultativesComponent,
    AppAccessDirective,
    ChartModule 
  ],
  entryComponents:[TimePickerComponent]
})
export class SharedModule {}
