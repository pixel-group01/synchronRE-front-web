import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creation-document-sinistre',
  templateUrl: './creation-document-sinistre.component.html',
  styleUrls: ['./creation-document-sinistre.component.scss']
})
export class CreationDocumentSinistreComponent implements OnInit {
  listeTypeDocument:any=[{id:1,libelle:'CSV'},{id:2,libelle:'EXCEL'}]
  items :any =[{}];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number; 

  constructor() { }

  ngOnInit(): void {
  }

}
