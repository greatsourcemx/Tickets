import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(id: number, adjunto?: boolean): any {

    let url = URL_SERVICIOS;
    if ( !adjunto ) {
      url += '/Login/image?id=' + id;
    } else {
      url += '/view?id=' + id;
    }

    return url;
  }

}
