import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() ListeTimesLines : any = [];

  dureeTotal : any;
  itemDate : any = {};

  constructor() { }

  ngOnInit(): void {

    if(this.ListeTimesLines && this.ListeTimesLines.length > 0) {
    
      if(this.ListeTimesLines[0]?.dateCreation) {
        let dateDeb = this.ListeTimesLines[0]?.dateCreation;
        let tabDateDebWithSpace = dateDeb.split(" ");
        let dateSplitWithSlash = tabDateDebWithSpace[0].split("/")
        this.itemDate.dateDebut = new Date(dateSplitWithSlash[2],dateSplitWithSlash[1]-1,dateSplitWithSlash[0],tabDateDebWithSpace[1].split(":")[0],tabDateDebWithSpace[1].split(":")[1])
      }
    
      if(this.ListeTimesLines[this.ListeTimesLines?.length - 1]?.dateCreation) {
        let dateFin = this.ListeTimesLines[this.ListeTimesLines?.length - 1]?.dateCreation;
        let tabDateFinWithSpace = dateFin.split(" ");
        let dateSplitWithSlash = tabDateFinWithSpace[0].split("/")
        this.itemDate.dateFin = new Date(dateSplitWithSlash[2],dateSplitWithSlash[1]-1,dateSplitWithSlash[0],tabDateFinWithSpace[1].split(":")[0],tabDateFinWithSpace[1].split(":")[1])
      }
       
      if(this.itemDate.dateFin && this.itemDate.dateDebut) {
        console.log(" this.itemDate.dateFin ",this.itemDate.dateFin);
        console.log(" this.itemDate.dateDebut ",this.itemDate.dateDebut);
        
        this.itemDate.uniteDuration = 'minutes';
        let duration : any = "";
        duration = moment(this.itemDate.dateFin).diff(this.itemDate.dateDebut,'minutes')
        

        if(duration > 1440 ) {
          this.itemDate.uniteDuration = "jour(s)";
          duration = moment(this.itemDate.dateFin).diff(this.itemDate.dateDebut,'days');
        }

        this.itemDate.duration = duration;
        console.log(" duration ",duration);
      }

    }
  }

}
