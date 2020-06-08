import { Component, OnInit } from '@angular/core';
import { TiposService } from '../../services/service.index';
import { Tipo } from '../../models/tipo.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  tipos: any = [];
  cargando = false;
  showNavegacion = false;

  constructor( public _tipoService: TiposService) { }

  ngOnInit() {
    this.cargarTipos();
  }

  cargarTipos ( ) {
    this.cargando = true;
    this._tipoService.cargarTipos( this.desde )
    .subscribe( (resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].TotalRegistros;
        this.showNavegacion = this.totalRegistros >= 15;
        this.tipos = resp;
      }
      this.cargando = false;
    });
  }

  buscarTipo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarTipos();
      return;
    }

    this.cargando = true;

    this._tipoService.buscarTipo( termino )
            .subscribe( (resp: any) => {
              this.tipos = resp;
              this.cargando = false;
            });

  }

  actualizarTipo (tipo: Tipo) {
    this._tipoService.modificarTipo( tipo )
        .subscribe( usr => {
          swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
  }
  
  crearTipo() {
    swal.fire({
      title: 'Crear Tipo',
      text: 'Ingrese la Descripción',
      input: 'text',
      showCancelButton: true
    }).then( (valor) => {

      if ( !valor ) {
        return;
      }

      this._tipoService.guardarTipo( valor )
              .subscribe( () => {
                this.cargarTipos();
                swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
              },
              error => {
                swal.fire('Aviso!', error.error, 'warning');
              });

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
    this.cargarTipos();

  }

}
