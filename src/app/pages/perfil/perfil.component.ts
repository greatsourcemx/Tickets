import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Perfil } from '../../models/models.index';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();
  usuario: Usuario = new Usuario();
  confirm = '';
  rating = 0;

  constructor(public _usuarioService: UsuarioService,
              config: NgbRatingConfig) {
                config.max = 5;
                config.readonly = true;
              }

  ngOnInit() {
    this.cargarInfo();
    this.cargarPromedio();
  }

  cargarPromedio() {
    this._usuarioService.cargarPromedio()
    .subscribe((rsp: any) => {
      this.rating = rsp;
    });
  }

  cargarInfo () {
    this._usuarioService.cargarPerfil()
    .subscribe((data: Perfil) => {
      this.perfil = data;
    });
    this._usuarioService.cargarLoagueado()
    .subscribe((data: Usuario) => {
      this.usuario = data;
    });
  }

  cambiarClave( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.confirm !== this.perfil.claveNueva ) {
      swal.fire('Advetencia', 'La contraseña de validación no coincide', 'warning' );
      return;
    }
    if ( this.perfil.claveNueva === this.perfil.clave ) {
      swal.fire('Advetencia', 'La nueva contraseña debe ser diferente al actual', 'warning' );
      return;
    }

    this._usuarioService.cambiarClave( this.perfil )
    .subscribe((data: string) => {
      if (data === 'OK') {
        swal.fire('Correcto', 'Se ha cambiado la contraseña', 'success' );
      } else {
        swal.fire('Advetencia', data, 'warning' );
      }
      this.perfil.clave = '';
      this.perfil.claveNueva = '';
      this.confirm = '';
    });
  }

}
