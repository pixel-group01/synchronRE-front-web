import { Component, Input, OnInit } from '@angular/core';
import { BusinessOptional } from 'src/app/core/models/businessOptional';

@Component({
  selector: 'app-details-information-identification',
  templateUrl: './details-information-identification.component.html',
  styleUrls: ['./details-information-identification.component.scss']
})
export class DetailsInformationIdentificationComponent implements OnInit {

  @Input() itemAffaireFacultative : BusinessOptional;
  
  constructor() { }

  ngOnInit(): void {
  }

}
