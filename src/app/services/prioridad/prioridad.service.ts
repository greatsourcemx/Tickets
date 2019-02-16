import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Prioridad } from '../../models/Prioridad.model';
import 'rxjs/add/operator/map';

@Injectable()
export class PrioridadService {

  constructor( public http: HttpClient) { }

  cargarPrioridades ( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/prioridades?desde=' + desde;
    return this.http.get( url );
  }

  buscarPrioridad ( termino: string ) {
    let url = URL_SERVICIOS + '/prioridades?termino=' + termino;
    return this.http.get( url )
          .map( (resp: any) => resp );
  }

  cargarActivos ( ) {
    let url = URL_SERVICIOS + '/prioridad/activos';
    return this.http.get( url );
  }


  guardarPrioridad ( prioridad: Prioridad ) {
    let url = URL_SERVICIOS + '/prioridad';
    return this.http.post( url, prioridad )
          .map( (resp: any) => {
            swal('Prioridad Creada', prioridad.Nombre, 'success');
            return resp;
          });
  }

  modificarPrioridad ( prioridad: Prioridad ) {
    let url = URL_SERVICIOS + '/prioridad';
    return this.http.put( url, prioridad )
              .map( (resp) => {
                swal('Prioridad Actualizada', prioridad.Nombre, 'success');
                return resp;
              });
  }

}
