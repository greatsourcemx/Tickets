import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Tiempo } from '../../models/tiempo.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class TiempoService {

  tiempo: Tiempo;

  constructor( public http: HttpClient ) { }

  cargarTiempos( desde: number = 0 ) {
      let url = URL_SERVICIOS + '/Tiempos?desde=' + desde;
      return this.http.get( url );
  }

  buscarTiempo (termino: string) {

    let url = URL_SERVICIOS + '/Tiempos?termino=' + termino;
      return this.http.get( url )
              .map( (resp: any) => resp );

  }

  guardarTiempo (min: number) {

    let descr = '';
    if ( min >= 60 ) {
      descr = (min / 60).toString() + ' Horas';
    } else {
      descr = min.toString() + ' Min';
    }

    let tiempo = new Tiempo(min, descr);
    let url = URL_SERVICIOS + '/Tiempos';

    return this.http.post( url, tiempo )
            .map( (resp: any) => {
              swal('Duración Creado', tiempo.Descripcion, 'success');
              return resp;
      });
  }

  modificarTiempo (tiempo: Tiempo) {

    let url = URL_SERVICIOS + '/Tiempos/' + tiempo.Id;

      return this.http.put( url, tiempo )
            .map( (resp: any) => {
              swal('Duración Actualizado', tiempo.Descripcion, 'success');
              return resp;
            });

  }

}
