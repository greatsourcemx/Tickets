import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa.model';
import { EmpresasService } from '../../services/service.index';
import swal from 'sweetalert2';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as soliActions from '../../store/actions';

@Component({
  selector: 'app-editar-solicitante',
  templateUrl: './editar-solicitante.component.html',
  styles: []
})
export class EditarSolicitanteComponent implements OnInit {

  solicitante: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];

  constructor(public activatedRoute: ActivatedRoute,
    public _solicitanteService: SolicitanteService,
    public store: Store<AppState>,
    public _empresaService: EmpresasService,
    public router: Router ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.cargarSolicitante( id );

    });
  }

  cargarSolicitante( id: number ) {
    this._solicitanteService.cargarSolici( id )
          .subscribe( (soli: Usuario) => {
            this.solicitante = soli;
            this.cargarEmpresas();
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

    this._solicitanteService.modificarSolicitante( this.solicitante )
        .subscribe( usuario => {
          this.store.dispatch( new soliActions.LoadUsersAction() );
          this.router.navigate(['/solicitantes']);
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });

  }

}
