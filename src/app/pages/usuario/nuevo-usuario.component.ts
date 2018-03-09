import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');

  constructor( public _usuarioService: UsuarioService,
                public router: Router) { }

  ngOnInit() {
  }


  guardarUsuario( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._usuarioService.guardarUsuario( this.usuario )
            .subscribe( usuario => {
              this.usuario.id = usuario.id;
              this.router.navigate(['/usuarios']);
            },
            error => {
              swal('Aviso!', error.error, 'warning');
            });

  }

}
