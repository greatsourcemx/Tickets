import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo'
})
export class TiempoPipe implements PipeTransform {

  transform(tiempo: string, minuto?: boolean): string {

    let split = tiempo.split('|');
    if ( minuto ) {
      return split[1];
    } else {
      if ( split[0] === '1 Horas') {
        return '1 Hora';
      }
      return split[0];
    }
  }

}
