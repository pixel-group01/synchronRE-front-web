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

@NgModule({
  declarations: [
    MoneyFormatPipe,
    AddDocumentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    ElementByPagePaginatorComponent,
    TimePickerComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    AppAccessDirective
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
    BsDatepickerModule,
    AddDocumentComponent,
    DetailsDocumentsJointsComponent,
    FormPreviewPdfComponent,
    UiSwitchModule,
    NgSelectModule,
    FullCalendarModule,
    NgbModule,
    ElementByPagePaginatorComponent,
    TimePickerComponent,
    TimeLineComponent,
    PriseDeDecisionWorkflowComponent,
    AppAccessDirective,
    ChartModule 
  ],
  entryComponents:[TimePickerComponent]
})
export class SharedModule {}
