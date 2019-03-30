import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Servicio } from '../../models/servicio.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router) {
      this.cargarStorage();
    }

  estaLogueado() {
    return ( this.usuario ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.usuario = null;
    }

  }

  guardarStorage( usuario: Usuario ) {
    localStorage.setItem('usuario', JSON.stringify( usuario ));
    localStorage.setItem('url', usuario.root);
    this.usuario = usuario;
  }

  cerrarSesion() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('url');
    this.router.navigate(['/login']);
  }

  login (usuario: Usuario, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.correo);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/Login';
    return this.http.post(url, usuario)
    .map( (resp: any) => {
      this.guardarStorage(resp);
      return resp;
    });
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuarios?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/usuarios?termino=' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp );
  }

  cargarUsuaActivos( ) {
    let url = URL_SERVICIOS + '/usuarios/activos';
    return this.http.get( url );
  }

  guardarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {
                swal('Usuario Creado', usuario.nombre, 'success');
                return resp;
              });
  }

  modificarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.put( url, usuario )
                .map( (resp: any) => {
                  swal('Usuario Actualizado', usuario.nombre, 'success');
                  return resp;
                });
  }

  cargarUsuario (id: number) {

    let url = URL_SERVICIOS + '/usuario?id=' + id;

    return this.http.get( url )
              .map( (resp: any) => resp );
  }

  cargarLoagueado() {
    const url = URL_SERVICIOS + '/user';
    return this.http.get( url );
  }

  notificaciones( serv: Servicio[] ) {
    const url = URL_SERVICIOS + '/notificaciones';
    return this.http.post( url, serv )
    .map((data: any) => {
      return data;
    });
  }

  cargarPerfil() {
    const url = URL_SERVICIOS + '/perfil';
    return this.http.get( url );
  }

  cambiarClave( perfil: any ) {
    const url = URL_SERVICIOS + '/change/password';
    return this.http.post( url, perfil )
    .map((data: any) => {
      return data;
    });
  }

}
