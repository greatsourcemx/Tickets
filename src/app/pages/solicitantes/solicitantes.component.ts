import { Component, OnInit } from '@angular/core';
import { ESTATUS_USUARIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { SolicitanteService } from '../../services/service.index';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styles: []
})
export class SolicitantesComponent implements OnInit {

  solicitantes: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  estados: any = JSON.parse(ESTATUS_USUARIOS.toString());

  constructor( public _solicitanteService: SolicitanteService ) { }

  ngOnInit() {
    this.cargarSolicitantes();
  }

  cargarSolicitantes() {

    this.cargando = true;

    this._solicitanteService.cargarSolicitantes( this.desde )
              .subscribe( (resp: any) => {
                if (resp.length !== 0) {
                  this.totalRegistros = resp[0].totalUsuarios;
                  this.solicitantes = resp;
                }
                this.cargando = false;
              });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    let totalPages = Math.ceil(this.totalRegistros / 15);

    if ( desde >= totalPages ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarSolicitantes();

  }

  buscarSolicitante( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarSolicitantes();
      return;
    }

    this.cargando = true;

    this._solicitanteService.buscarSolicitante( termino )
            .subscribe( (soli: Usuario[]) => {

              this.solicitantes = soli;
              this.cargando = false;
            });

  }

  modificarSolicitante (solicitante: Usuario) {

    this._solicitanteService.modificarSolicitante( solicitante )
        .subscribe( usr => {
          solicitante.password = '';
          swal('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

}
