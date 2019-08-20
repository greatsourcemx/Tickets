import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styles: []
})
export class EditUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
              public _empresaService: EmpresasService,
              public router: Router ) {
    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.cargarUsuario( id );

    });
  }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarUsuario( id: number ) {
    this._usuarioService.cargarUsuario( id )
          .subscribe( user => {
            this.usuario = user;
          });
  }

  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: Empresa[]) => {
      this.Empresas = resp;
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
          swal.fire('Aviso!', error.error, 'warning');
        });

  }

}
