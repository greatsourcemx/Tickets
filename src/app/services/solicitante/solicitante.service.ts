import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Areas } from '../../models/areas.model';

import { Router } from '@angular/router';

@Injectable()
export class SolicitanteService {

  solicitante: Usuario;

  constructor(public http: HttpClient,
              public router: Router) { }

    cargarSolicitantes( desde: number = 0 ) {
      let url = URL_SERVICIOS + '/solicitante?desde=' + desde;
      return this.http.get( url );
    }

    buscarSolicitante( termino: string ) {
      let url = URL_SERVICIOS + '/solicitante?termino=' + termino;
      return this.http.get( url ).pipe(
                  map( (resp: any) => resp ));

    }

    cargarSoliActivos( ) {
      let url = URL_SERVICIOS + '/solicitante/activos';
      return this.http.get( url );
    }


    guardarSolicitante (usuario: Usuario) {
      let url = URL_SERVICIOS + '/solicitante';
      return this.http.post( url, usuario ).pipe(
                map( (resp: any) => {
                  swal.fire('Solicitante Creado', usuario.nombre, 'success');
                  return resp;
                }));
    }

    modificarSolicitante (usuario: Usuario) {
      let url = URL_SERVICIOS + '/solicitante';
      return this.http.put( url, usuario ).pipe(
                  map( (resp: any) => {
                    swal.fire('Solicitante Actualizado', usuario.nombre, 'success');
                    return resp;
                  }));
    }
    modificarExtension (usuario: Usuario) {
      debugger;
      let url = URL_SERVICIOS + '/extension';
      return this.http.put( url, usuario ).pipe(
                  map( (resp: any) => {
                    swal.fire('Solicitante Actualizado', usuario.nombre, 'success');
                    return resp;
                  }));
    }
    cargarAreas () {
      debugger;
      let url = URL_SERVICIOS + '/areas';
      return this.http.get( url ).pipe(
                map( (resp: any) => resp ));
    }
    guardararea ( area: Areas ) {
      let url = URL_SERVICIOS + '/areanueva';
  
      return this.http.post( url, area ).pipe(
                  map( (resp: any) => {
                    swal.fire('Area Creada', area.descripcion, 'success');
                    return resp;
                  }));
    }
    modificarEmpresa ( area: Areas ) {
      let url = URL_SERVICIOS + '/updatearea';
  
      return this.http.put( url, area ).pipe(
                    map( (resp: any) => {
                      swal.fire('Area Actualizada', area.descripcion, 'success');
                      return resp;
                    }));
    }
    cargarSolici (id: number) {
      let url = URL_SERVICIOS + '/solicitor?id=' + id;
      return this.http.get( url ).pipe(
                map( (resp: any) => resp ));
    }

    enviarPassword( soli: Usuario ) {
      const url = URL_SERVICIOS + '/solicitante/correo';
      return this.http.post( url, soli ).pipe(
      map((data: any) => {
        return data;
      }));
    }

}
