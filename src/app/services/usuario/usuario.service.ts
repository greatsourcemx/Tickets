import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  // token: string;

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
      // this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      // this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( usuario: Usuario ) {
    // localStorage.setItem('id', id);
    // localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));

    this.usuario = usuario;
    // this.token = token;
  }

  cerrarSesion() {
    this.usuario = null;
    // this.token = '';
    // localStorage.removeItem('id');
    // localStorage.removeItem('token');
    localStorage.removeItem('usuario');
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

    let url = URL_SERVICIOS + '/Usuarios?desde=' + desde;
    return this.http.get( url );

  }

  cargarUsuaActivos( ) {

    let url = URL_SERVICIOS + '/Usuarios?activo=si';
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/Usuarios?termino=' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp );

  }

  guardarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/Usuarios';

    return this.http.post( url, usuario )
              .map( (resp: any) => {
                swal('Usuario Creado', usuario.nombre, 'success');
                return resp;
              });
  }

  modificarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/Usuarios/' + usuario.id;

    return this.http.put( url, usuario )
                .map( (resp: any) => {
                  swal('Usuario Actualizado', usuario.nombre, 'success');
                  return resp;
                });
  }

  cargarUsuario (id: number) {

    let url = URL_SERVICIOS + '/Usuarios/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp );
  }

}
