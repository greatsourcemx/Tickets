import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import * as data from '../../config/estados.json';
import swal from 'sweetalert';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  estados: any = data.default;
  cargando: boolean = true;
  showNavegacion = false;

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].totalUsuarios;
        this.showNavegacion = this.totalRegistros >= 15;
        this.usuarios = resp;
      }
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    let totalPages = Math.ceil(this.totalRegistros / 15);

    if ( desde >= totalPages ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  modificarUsuario (usuario: Usuario) {
    this._usuarioService.modificarUsuario( usuario )
        .subscribe( usr => {
          usuario.password = '';
          swal('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

}
