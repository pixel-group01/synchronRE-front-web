import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return 0;

    let nombre=value;
    nombre += '';
    let sep = ' ';
    let reg = /(\d+)(\d{3})/;

    while (reg.test(nombre)) {
        nombre = nombre.replace(reg, '$1' + sep + '$2');
    }

    return nombre;
}

}
