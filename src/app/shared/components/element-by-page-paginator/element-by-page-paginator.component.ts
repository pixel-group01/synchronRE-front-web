import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-element-by-page-paginator',
  templateUrl: './element-by-page-paginator.component.html',
  styleUrls: ['./element-by-page-paginator.component.scss']
})
export class ElementByPagePaginatorComponent implements OnInit {

  @Output() paginationChange  = new EventEmitter<any>();
  @Input() defaultItemPerPage : any;

  itemPagination : any;
  constructor() { }

  changePagination() {

    if(this.itemPagination) {
      this.paginationChange.emit(this.itemPagination);
    }else {
      this.paginationChange.emit(10000);
    }

  }

  ngOnInit(): void {
    this.itemPagination = this.defaultItemPerPage
  }

}
