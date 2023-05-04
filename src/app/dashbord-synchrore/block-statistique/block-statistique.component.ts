import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-statistique',
  templateUrl: './block-statistique.component.html',
  styleUrls: ['./block-statistique.component.scss']
})
export class BlockStatistiqueComponent implements OnInit {

  @Input() title: string = '';
  @Input() nombre: number = 0;
  @Input() cssClass: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
