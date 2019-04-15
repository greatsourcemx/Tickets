import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import { NgForm } from '@angular/forms';
import { UsuarioService, EmpresasService } from '../../services/service.index';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];

  constructor(public _usuarioService: UsuarioService,
              public _empresaService: EmpresasService,
              public router: Router) { }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: Empresa[]) => {
      this.Empresas = resp;
    });
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
