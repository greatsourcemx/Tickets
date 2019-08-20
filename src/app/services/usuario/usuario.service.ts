
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Servicio } from '../../models/servicio.model';
import { URL_SERVICIOS } from '../../config/config';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { SetUserAction } from '../../store/actions/auth.actions';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../store/actions/ui.actions';


@Injectable()
export class UsuarioService {

  usuario: Usuario;

  constructor(public http: HttpClient,
              private store: Store<AppState>,
              public router: Router) {
                this.cargarStorage();
              }

  estaLogueado() {
    return ( this.usuario ) ? true : false;
  }

  esAdmin() {
    const url = URL_SERVICIOS + '/isadmin';
    return this.http.post( url , { } ).pipe(
      map((data: boolean) => {
        return data;
      })
    );
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

    this.store.dispatch( new ActivarLoadingAction() );

    const url = URL_SERVICIOS + '/Login';
    return this.http.post(url, usuario).pipe(
    map( (resp: Usuario) => {
      this.guardarStorage(resp);
      this.store.dispatch( new DesactivarLoadingAction() );
      this.store.dispatch( new SetUserAction ( resp ) );
      return resp;
    }));
  }

  cargarPromedio() {
    const url = URL_SERVICIOS + '/rating';
    return this.http.get( url );
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuarios?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/usuarios?termino=' + termino;
    return this.http.get( url ).pipe(
                map( (resp: any) => resp ));
  }

  cargarUsuaActivos( ) {
    let url = URL_SERVICIOS + '/usuarios/activos';
    return this.http.get( url );
  }

  guardarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(
              map( (resp: any) => {
                swal.fire('Usuario Creado', usuario.nombre, 'success');
                return resp;
              }));
  }

  modificarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.put( url, usuario ).pipe(
                map( (resp: any) => {
                  swal.fire('Usuario Actualizado', usuario.nombre, 'success');
                  return resp;
                }));
  }

  cargarUsuario (id: number) {

    let url = URL_SERVICIOS + '/usuario?id=' + id;

    return this.http.get( url ).pipe(
              map( (resp: any) => resp ));
  }

  cargarLoagueado() {
    const url = URL_SERVICIOS + '/user';
    return this.http.get( url );
  }

  notificaciones( serv: Servicio[] ) {
    const url = URL_SERVICIOS + '/notificaciones';
    return this.http.post( url, serv ).pipe(
    map((data: any) => {
      return data;
    }));
  }

  cargarPerfil() {
    const url = URL_SERVICIOS + '/perfil';
    return this.http.get( url );
  }

  cambiarClave( perfil: any ) {
    const url = URL_SERVICIOS + '/change/password';
    return this.http.post( url, perfil ).pipe(
    map((data: any) => {
      return data;
    }));
  }

  generaTokenRecuperacion( correo: string ) {
    const url = URL_SERVICIOS + '/login/recover?correo=' + correo;
    return this.http.get( url );
  }

  validarToken( tk: Usuario ) {
    const url = URL_SERVICIOS + '/login/recover';
    return this.http.post( url, tk ).pipe(
    map((data: any) => {
      return data;
    }));
  }

}
