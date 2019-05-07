import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizar'
})
export class CapitalizarPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let nombres: string[] = value.split(' ');

    switch (nombres.length) {
      case 1:
      case 2:
        return value;
      case 3:
        return nombres[0] + ' ' + nombres[1];
      case 4:
        return nombres[1] + ' ' + nombres[2];
      case 5:
        return nombres[2] + ' ' + nombres[3];
      default:
        return value;
    }

  }

}
