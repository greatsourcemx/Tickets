import { Component, OnInit } from '@angular/core';
import { ESTATUS_USUARIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  estados: any = JSON.parse(ESTATUS_USUARIOS.toString());

  constructor( public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    console.log(this.estados);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {
                this.totalRegistros = resp[0].totalUsuarios;
                this.usuarios = resp;
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
          swal('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

}
