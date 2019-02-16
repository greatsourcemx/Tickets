import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Tipo } from '../../models/tipo.model';

@Injectable()
export class TiposService {

  constructor( public http: HttpClient ) { }

  cargarTipos ( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/tipos?desde=' + desde;
    return this.http.get( url );
  }

  buscarTipo ( termino: string ) {
    let url = URL_SERVICIOS + '/tipos?termino=' + termino;
    return this.http.get( url );
  }

  cargarTiposActivos ( ) {
    let url = URL_SERVICIOS + '/tipos/activos';
    return this.http.get( url );
  }

  guardarTipo ( descripcion ) {
    let tipo = new Tipo( descripcion );
    let url = URL_SERVICIOS + '/tipo';
    return this.http.post( url, tipo )
            .map( (resp: any) => {
              swal('Tipo de Servicio Creado', tipo.descripcion, 'success');
              return resp;
      });
  }

  modificarTipo ( tipo: Tipo ) {
    let url = URL_SERVICIOS + '/tipo';
    return this.http.put( url, tipo )
            .map( (resp: any) => {
              swal('Tipo de Servicio Actualizado', tipo.descripcion, 'success');
              return resp;
      });
  }

}
