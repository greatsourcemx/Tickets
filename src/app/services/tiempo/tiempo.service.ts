import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../../models/tiempo.model';
import { URL_SERVICIOS } from '../../config/config';


@Injectable()
export class TiempoService {

  tiempo: Tiempo;

  constructor( public http: HttpClient ) { }

  cargarTiempos( desde: number = 0 ) {
      let url = URL_SERVICIOS + '/tiempos?desde=' + desde;
      return this.http.get( url );
  }

  cargarTiemposActivos () {
    let url = URL_SERVICIOS + '/tiempos/activos';
    return this.http.get( url );
  }

  buscarTiempo (termino: string) {

    let url = URL_SERVICIOS + '/tiempos?termino=' + termino;
      return this.http.get( url ).pipe(
              map( (resp: any) => resp ));

  }

  guardarTiempo (min: number) {

    let descr = '';
    if ( min >= 60 ) {
      descr = (min / 60).toString() + ' Horas';
    } else {
      descr = min.toString() + ' Min';
    }

    let tiempo = new Tiempo(min, descr);
    let url = URL_SERVICIOS + '/tiempo';

    return this.http.post( url, tiempo ).pipe(
            map( (resp: any) => {
              swal('Duración Creado', tiempo.Descripcion, 'success');
              return resp;
      }));
  }

  modificarTiempo (tiempo: Tiempo) {

    let url = URL_SERVICIOS + '/tiempo';

      return this.http.put( url, tiempo ).pipe(
            map( (resp: any) => {
              swal('Duración Actualizado', tiempo.Descripcion, 'success');
              return resp;
            }));

  }

}
