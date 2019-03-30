import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordar = false;
  correo: string;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
   ) { }

  ngOnInit() {
    init_plugins();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recordar = true;
    }
  }

  ingresar( forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }
    const usuario = new Usuario(forma.value.correo, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recordar)
      .subscribe( (resp: any) => {
        this.router.navigate(['/' + resp.root]);
      },
      error => {
        swal('Aviso!', 'Usuario o contraseña incorrectos', 'warning');
      }
    );
  }

}
