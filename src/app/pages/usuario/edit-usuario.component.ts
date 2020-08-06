import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Areas } from '../../models/areas.model';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styles: []
})
export class EditUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];
  Areas: Areas[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
              public _empresaService: EmpresasService,
              public _solicitanteService: SolicitanteService,
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
            this.cargarAreas();
          });
  }
  cargarAreas () {
    this._solicitanteService.cargarAreas()
    .subscribe( (resp: Areas[]) => {
      this.Areas = resp;
    });
  }
  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: Empresa[]) => {
      this.Empresas = resp;
    });
  }
  EditarEmpr(id, algo) {
    debugger;
    this.usuario.empresa ;
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
  enableButton(){
    //document.getElementById("botonG").disabled = true;
    var element = <HTMLInputElement> document.getElementById("botonG");
    element.disabled = false;
  }
}
