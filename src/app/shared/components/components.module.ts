import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
// import { SelectFonctionComponent } from './select-fonction/select-fonction.component';
// import { DetailsBusinessOptionalComponent } from './details-business-optional/details-business-optional.component';
 
@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent ],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
