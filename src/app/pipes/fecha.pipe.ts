import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date, args?: any): string {

    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    switch ( date.getMonth() + 1 ) {
      case 1:
      return dia + '/Ene/' + year;
      case 2:
      return dia + '/Feb/' + year;
      case 3:
      return dia + '/Mar/' + year;
      case 4:
      return dia + '/Abr/' + year;
      case 5:
      return dia + '/May/' + year;
      case 6:
      return dia + '/Jun/' + year;
      case 7:
      return dia + '/Jul/' + year;
      case 8:
      return dia + '/Ago/' + year;
      case 9:
      return dia + '/Sep/' + year;
      case 10:
      return dia + '/Oct/' + year;
      case 11:
      return dia + '/Nov/' + year;
      case 12:
      return dia + '/Dic/' + year;
    }

    return dia + '/Sin Mes/' + year;
  }

}
