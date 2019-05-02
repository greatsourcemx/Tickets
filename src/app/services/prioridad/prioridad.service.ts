
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Prioridad } from '../../models/Prioridad.model';


@Injectable()
export class PrioridadService {

  constructor( public http: HttpClient) { }

  cargarPrioridades ( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/prioridades?desde=' + desde;
    return this.http.get( url );
  }

  buscarPrioridad ( termino: string ) {
    let url = URL_SERVICIOS + '/prioridades?termino=' + termino;
    return this.http.get( url ).pipe(
          map( (resp: any) => resp ));
  }

  cargarActivos ( ) {
    let url = URL_SERVICIOS + '/prioridad/activos';
    return this.http.get( url );
  }


  guardarPrioridad ( prioridad: Prioridad ) {
    let url = URL_SERVICIOS + '/prioridad';
    return this.http.post( url, prioridad ).pipe(
          map( (resp: any) => {
            swal('Prioridad Creada', prioridad.Nombre, 'success');
            return resp;
          }));
  }

  modificarPrioridad ( prioridad: Prioridad ) {
    let url = URL_SERVICIOS + '/prioridad';
    return this.http.put( url, prioridad ).pipe(
              map( (resp) => {
                swal('Prioridad Actualizada', prioridad.Nombre, 'success');
                return resp;
              }));
  }

}
