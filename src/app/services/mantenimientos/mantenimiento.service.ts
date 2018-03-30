import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Mantenimiento } from '../../models/mantenimiento.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class MantenimientoService {

  mante: Mantenimiento;

  constructor( public http: HttpClient ) { }

  cargarMantenimientos ( desde: number = 0) {

    let url = URL_SERVICIOS + '/Mantenimiento?desde=' + desde;
    return this.http.get( url )
    .map( (resp: any) => resp );

  }

  buscarMantenimiento ( termino: string ) {

    let url = URL_SERVICIOS + '/Mantenimiento?termino=' + termino;
    return this.http.get( url )
    .map( (resp: any) => resp );

  }

  guardarMantenimiento ( mante: Mantenimiento ) {

    let url = URL_SERVICIOS + '/Mantenimiento';
    return this.http.post( url, mante )
            .map( (resp: any) => {
              swal('Mantenimiento Creado', mante.EquiId, 'success');
              return resp;
      });

  }

  modificarMante (mante: Mantenimiento ) {

    let url = URL_SERVICIOS + '/Mantenimiento/' + mante.Id;
    return this.http.put( url, mante )
            .map( (resp: any) => {
              swal('Mantenimiento Actualizado', mante.EquiId, 'success');
              return resp;
            });
  }

}
