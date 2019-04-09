import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Recurrentes } from '../../models/recurrentes.model';

@Injectable()
export class RecurrentesService {

  constructor(public http: HttpClient) { }

  cargarRecurrentes() {
    const url = URL_SERVICIOS + '/recurrentes';
    return this.http.get( url );
  }

  cargarRecurrente( id: number) {
    const url = URL_SERVICIOS + '/recurrente?id=' + id;
    return this.http.get( url );
  }

  guardarRecurrente( recurrentes: Recurrentes ) {
    const url = URL_SERVICIOS + '/recurrentes';
    return this.http.post( url, recurrentes )
    .map((data: any) => {
      return data;
    });
  }

  modificarRecurrente( recurrentes: Recurrentes ) {
    const url = URL_SERVICIOS + '/recurrentes';
    return this.http.put( url, recurrentes )
    .map((data: any) => {
      return data;
    });
  }

  actualizarRecurrente( recurrentes: Recurrentes ) {
    const url = URL_SERVICIOS + '/recurrente/editar';
    return this.http.put( url, recurrentes )
    .map((data: any) => {
      return data;
    });
  }

}
