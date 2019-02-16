import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horas'
})
export class HorasPipe implements PipeTransform {

  transform(value: number): string {

    let MINUTES = (value * 60);
    let m = MINUTES % 60;
    let h = (MINUTES - m) / 60;

    if (h > 0 && m > 0) {
      return h.toString() + ' Horas ' + m.toFixed() + ' Minutos';
    } else if ( h > 0 && m <= 0) {
      return h.toString() + ' Horas';
    } else if (h <= 0 && m > 0) {
      return m.toString() + ' Minutos';
    } else {
      return 'Sin Tiempo';
    }

  }

}
