import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styles: []
})
export class EditUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');

  constructor(public activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
              public router: Router ) {
    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.cargarUsuario( id );

    });
  }

  ngOnInit() {
  }

  cargarUsuario( id: number ) {
    this._usuarioService.cargarUsuario( id )
          .subscribe( user => {
            this.usuario = user;
          });
  }

  guardar ( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._usuarioService.modificarUsuario( this.usuario )
        .subscribe( usuario => {
          this.router.navigate(['/usuarios']);
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });

  }

}
