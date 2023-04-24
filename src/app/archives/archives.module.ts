import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivesRoutingModule } from './archives-routing.module';
import { ContainerArchivesComponent } from './container-archives/container-archives.component';
import { ArchiveAffairesFacultativesComponent } from './archive-affaires-facultatives/archive-affaires-facultatives.component';
import { ArchiveAffairesTraiteesComponent } from './archive-affaires-traitees/archive-affaires-traitees.component';
import { ArchiveSinistreComponent } from './archive-sinistre/archive-sinistre.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContainerArchivesComponent,
    ArchiveAffairesFacultativesComponent,
    ArchiveAffairesTraiteesComponent,
    ArchiveSinistreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,  
    ArchivesRoutingModule
  ]
})
export class ArchivesModule { }
