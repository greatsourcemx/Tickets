import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class SolicitanteService {

  solicitante: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router) { }

    cargarSolicitantes( desde: number = 0 ) {
      let url = URL_SERVICIOS + '/Solicitantes?desde=' + desde;
      return this.http.get( url );
    }

    buscarSolicitante( termino: string ) {

      let url = URL_SERVICIOS + '/Solicitantes?termino=' + termino;
      return this.http.get( url )
                  .map( (resp: any) => resp );

    }

    guardarSolicitante (usuario: Usuario) {
      let url = URL_SERVICIOS + '/Solicitantes';

      return this.http.post( url, usuario )
                .map( (resp: any) => {
                  swal('Solicitante Creado', usuario.nombre, 'success');
                  return resp;
                });
    }

    modificarSolicitante (usuario: Usuario) {
      let url = URL_SERVICIOS + '/Solicitantes/' + usuario.id;

      return this.http.put( url, usuario )
                  .map( (resp: any) => {
                    swal('Solicitante Actualizado', usuario.nombre, 'success');
                    return resp;
                  });
    }

    cargarSolici (id: number) {

      let url = URL_SERVICIOS + '/Usuarios/' + id;

      return this.http.get( url )
                .map( (resp: any) => resp );
    }

}
