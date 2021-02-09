import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'servicioimagen'
})
export class ImagenesPipe implements PipeTransform {

  transform(id: number, adjunto?: boolean): any {

    let url = URL_SERVICIOS;
    
      url += '/servicioscatalogo/view?id=' + id; 

    return url;
  }

}
