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
import { AddDocumentComponent } from "./components/add-document/add-document.component";
import { MatTabsModule } from "@angular/material/tabs";
import { DetailsDocumentsJointsComponent } from "./components/details-documents-joints/details-documents-joints.component";
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormPreviewPdfComponent } from "./components/form-preview-pdf/form-preview-pdf.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ElementByPagePaginatorComponent } from "./components/element-by-page-paginator/element-by-page-paginator.component";
import { TimePickerComponent } from "./components/time-picker/time-picker.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TimeLineComponent } from "./components/time-line/time-line.component";
import { PriseDeDecisionWorkflowComponent } from "./components/prise-de-decision-workflow/prise-de-decision-workflow.component";
import { AppAccessDirective } from "./directive/app-access.directive";
import { ChartModule } from 'angular-highcharts';
import { DetailsBusinessOptionalComponent } from "./components/details-business-optional/details-business-optional.component";
import { DetailsInformationIdentificationComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/details-information-identification/details-information-identification.component";
import { AddFileInFormComponent } from "./components/add-file-in-form/add-file-in-form.component";
import { FormAffaireFacultativesComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-affaire-facultatives.component";
import { FormIdentificationComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-identification/form-identification.component";
import { FormRepartitionComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-repartition/form-repartition.component";
import { FormPlacementComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-placement/form-placement.component";
import { DetailsAffaireFacultativeComponent } from "./components/details-affaire-facultative/details-affaire-facultative.component";
import { ListAffairesFacultativesComponent } from "../business-manager/affaire-facutatives/list-affaires-facultatives/list-affaires-facultatives.component";
import { FormRetournerAffaireComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-retourner-affaire/form-retourner-affaire.component";
import { TableauPlacementComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-placement/tableau-placement/tableau-placement.component";
import { FormHistoriqueTraitementComponent } from "../business-manager/affaire-facutatives/form-affaire-facultatives/form-historique-traitement/form-historique-traitement.component";
import { DateFormatInDateHourPipe } from "../core/pipes/date-format-in-date-hour.pipe";
import { SelectFonctionComponent } from "./components/select-fonction/select-fonction.component";
import { TruncatePipe } from "../core/pipes/truncate.pipe";
import { CreationDocumentSinistreComponent } from "../sinistre/form-sinistre/creation-document-sinistre/creation-document-sinistre.component";
import { FormSinistreComponent } from "../sinistre/form-sinistre/form-sinistre.component";
import { CreationSinistreComponent } from "../sinistre/form-sinistre/creation-sinistre/creation-sinistre.component";
import { EtatComptableComponent } from "../sinistre/list-sinistre/etat-comptable/etat-comptable.component";
import { FormRetournerSinstreComponent } from "../sinistre/list-sinistre/form-retourner-sinstre/form-retourner-sinstre.component";

@NgModule({
  declarations: [
    MoneyFormatPipe,
    TruncatePipe,
    AddDocumentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    ElementByPagePaginatorComponent,
    TimePickerComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    AppAccessDirective,
    DetailsBusinessOptionalComponent,
    DetailsInformationIdentificationComponent,
    AddFileInFormComponent,
    FormAffaireFacultativesComponent,
    FormIdentificationComponent,
    FormRepartitionComponent,
    FormPlacementComponent,
    DetailsAffaireFacultativeComponent,
    ListAffairesFacultativesComponent,
    FormRetournerAffaireComponent,
    TableauPlacementComponent,
    FormHistoriqueTraitementComponent,
    DateFormatInDateHourPipe,
    SelectFonctionComponent, 
    CreationDocumentSinistreComponent,
    FormSinistreComponent,
    CreationSinistreComponent,
    EtatComptableComponent,
    FormRetournerSinstreComponent,
    
    // DetailsAffaireFacultativeComponent
    // ProgrammeDialyseComponent,
    // FormCreateProgrammeComponent,
    // ProgrammeDialyseAgendaComponent,
    // HistoriqueProgrammeDialyseComponent,
    // DetailsPatientsProgrammeComponent
  ],
  imports: [
    CommonModule,
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
    TruncatePipe,
    BsDatepickerModule,
    AddDocumentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    UiSwitchModule,
    NgSelectModule,
    FullCalendarModule,
    NgbModule,
    ElementByPagePaginatorComponent,
    DetailsInformationIdentificationComponent,
    AddFileInFormComponent,
    TimePickerComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    DetailsBusinessOptionalComponent,
    DetailsAffaireFacultativeComponent,
    FormAffaireFacultativesComponent,
    FormIdentificationComponent,
    FormRepartitionComponent,
    FormPlacementComponent,
    ListAffairesFacultativesComponent,
    FormRetournerAffaireComponent,
    TableauPlacementComponent,
    FormHistoriqueTraitementComponent,
    AppAccessDirective,
    DateFormatInDateHourPipe,
    ChartModule,
    SelectFonctionComponent,
    CreationDocumentSinistreComponent,
    FormSinistreComponent,
    CreationSinistreComponent,
    EtatComptableComponent,
    FormRetournerSinstreComponent,

  ],
  entryComponents:[TimePickerComponent]
})
export class SharedModule {}
