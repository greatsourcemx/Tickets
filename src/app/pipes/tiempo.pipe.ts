import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo'
})
export class TiempoPipe implements PipeTransform {

  transform(tiempo: string, minuto?: string): string {

    let split = tiempo.split('|');

    if ( minuto === 'min' ) {
      return split[1];
    }
    if ( minuto === 'comp' ) {
      if (split.length === 1) {
        return split[0];
      } else {
        let min: string = split[1];
        if ( min.charAt( 0 ) === '0') {
          return split[0];
        } else {
          return split[0] + ' ' + split[1];
        }
      }
    }
    if ( split[0] === '1 Horas') {
      return '1 Hora';
    }
    return split[0];
  }

}
