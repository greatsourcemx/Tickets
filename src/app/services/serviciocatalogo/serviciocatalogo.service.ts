import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { ServicioCatalogo } from '../../models/serviciocatalogo.model';
 

@Injectable()
export class ServicioCatalogoService {

  url = URL_SERVICIOS + '/servicioscatalogo';

  constructor(public http: HttpClient) { }
  
  cargarServicios () {
    return this.http.get( this.url + '/cargaservicios' ).pipe(
      map((data: any) => data));
  }
  consultaServicioid (id) {
    return this.http.get( this.url + '/consultaservicio?id=' + id).pipe(
      map((data: any) => data));
  }
  borraServicio (id) {
    return this.http.get( this.url + '/borraarchivos?id=' + id).pipe(
      map((data: any) => data));
  }
  crearServicio (serv: ServicioCatalogo) {
    debugger;
    let url = this.url + '/creaservicio';
    return this.http.put( url, serv ).pipe(
                map( (resp: any) => {
                  return resp;
                }));
  }
  downloadFile( id: number ) {
    const url = this.url + '/download';
    return this.http.post( url, id, { responseType: 'blob' }  ).pipe(
      map((data: any) => {
        return new Blob([data], { type: 'application/octet-stream' });
      }));
  }
  actualizaServicio (serv: ServicioCatalogo) {
    debugger;
    let url = this.url + '/actualizarserv';
    return this.http.put( url, serv ).pipe(
                map( (resp: any) => {
                  return resp;
                }));
  }
}
