import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from '../../models/mantenimiento.model';
import { MantenimientoService } from '../../services/service.index';


@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styles: []
})
export class MantenimientosComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  mantenimientos: any = [];

  constructor( public _manteServices: MantenimientoService ) { }

  ngOnInit() {
    this.cargarMantes();
  }

  cargarMantes () {
    this.cargando = true;

    this._manteServices.cargarMantenimientos( this.desde )
      .subscribe( (resp: any) => {
        if ( resp.length !== 0 ) {
          this.totalRegistros = resp[0].TotalRegistros;
          this.mantenimientos = resp;
          this.separarEquipo(this.mantenimientos[0].EquiId);
          this.separarTipo(this.mantenimientos[0].EquiId);
        }
        this.cargando = false;
      });
  }

  actualizarMante (mante: Mantenimiento) {

    this._manteServices.modificarMante(mante)
    .subscribe( (resp: any) => {
      swal('Aviso!', 'Se registrarón los cambios', 'success');
    },
    error => {
      swal('Aviso!', error.error, 'warning');
    });

  }

  crearMantenimiento ( mante: Mantenimiento ) {
    this._manteServices.guardarMantenimiento( mante )
    .subscribe( () => {
      this.cargarMantes();
      swal('Aviso!', 'Se registrarón los cambios', 'success');
    },
    error => {
      swal('Aviso!', error.error, 'warning');
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
    this.cargarMantes();

  }

  buscar( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMantes();
      return;
    }

    this.cargando = true;

    this._manteServices.buscarMantenimiento( termino )
            .subscribe( (mante: any) => {
              this.mantenimientos = mante;
              this.cargando = false;
            });

  }

  separarEquipo (valor: string) {
    let separador = '-';
    let limite = 4;
    let arreglo = valor.split(separador, limite);
    return arreglo[0] + '-' + arreglo[1].trim();
  }

  separarTipo (valor: string) {
    let separador = '-';
    let limite = 4;
    let arreglo = valor.split(separador, limite);
    return arreglo[arreglo.length - 1];
  }

}
