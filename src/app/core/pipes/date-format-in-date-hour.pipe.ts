import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormatInDateHour',
})
export class DateFormatInDateHourPipe implements PipeTransform {
  transform(date: any) {
    let dateFormat: string;
    if (!date) return;

    dateFormat = date.replace('T', ' ').substring(0, 16);

    let dateSplit = dateFormat.split(" ");

    if(dateSplit && dateSplit.length > 0) {
      let dateSplitSecond:any = dateSplit[0].split("-");

      if(dateSplitSecond && dateSplitSecond.length > 0) {
        if (dateSplit[1]) {
          dateFormat = moment(new Date(dateSplitSecond[0],dateSplitSecond[1]-1,dateSplitSecond[2])).format("DD/MM/YYYY")+" "+dateSplit[1] 
        }else{
          dateFormat = moment(new Date(dateSplitSecond[0],dateSplitSecond[1]-1,dateSplitSecond[2])).format("DD/MM/YYYY")
        }
      }
    }

    return dateFormat;
  }
}
