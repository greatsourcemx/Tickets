import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Perfil } from '../../models/models.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  perfil: Perfil = new Perfil();
  confirm = '';

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarInfo();
  }

  cargarInfo () {
    this._usuarioService.cargarPerfil()
    .subscribe((data: Perfil) => {
      this.perfil = data;
    });
  }

  cambiarClave( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.confirm !== this.perfil.claveNueva ) {
      swal('Advetencia', 'La contraseña de validación no coincide', 'warning' );
      return;
    }
    if ( this.perfil.claveNueva === this.perfil.clave ) {
      swal('Advetencia', 'La nueva contraseña debe ser diferente al actual', 'warning' );
      return;
    }

    this._usuarioService.cambiarClave( this.perfil )
    .subscribe((data: string) => {
      if (data === 'OK') {
        swal('Correcto', 'Se ha cambiado la contraseña', 'success' );
      } else {
        swal('Advetencia', data, 'warning' );
      }
      this.perfil.clave = '';
      this.perfil.claveNueva = '';
      this.confirm = '';
    });
  }

}
