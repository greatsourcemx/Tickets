import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { SolicitanteService, EmpresasService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Empresa } from '../../models/empresa.model';
import { Areas } from '../../models/areas.model';


import swal from 'sweetalert2';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as soliActions from '../../store/actions';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styles: []
})
export class SolicitanteComponent implements OnInit {

  solicitante: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];
  Areas: Areas[] = [];


  constructor(
    public _solicitanteService: SolicitanteService,
    public _empresaService: EmpresasService,
    public store: Store<AppState>,
    public router: Router) { }

  ngOnInit() {
    this.solicitante.actualizarPassword = true;
    this.cargarEmpresas();
    this.cargarAreas();
  }

  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: any) => {
      this.Empresas = resp;
    });
  }
  cargarAreas () {
    this._solicitanteService.cargarAreas()
    .subscribe( (resp: Areas[]) => {
      this.Areas = resp;
    });
  }
  generaNombreUsuario() {
    let username = this.solicitante.correo;
    if (username !== '') {
      if (username.indexOf('@') !== -1) {
        this.solicitante.usuario = username.substr(0, username.indexOf('@'));
      }
    }

  }

  guardarSolicitante( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._solicitanteService.guardarSolicitante( this.solicitante )
            .subscribe( soli => {
              this.store.dispatch( new soliActions.LoadUsersAction() );
              this.solicitante.id = soli.id;
              this.router.navigate(['/solicitantes']);
            },
            error => {
              swal.fire('Aviso!', error.error, 'warning');
            });

  }

}
