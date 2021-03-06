import { Component, OnInit } from '@angular/core';
import { Tiempo } from '../../models/tiempo.model';
import { TiempoService } from '../../services/service.index';
declare var swal: any;
// store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as timeActions from '../../store/actions';

@Component({
  selector: 'app-tiempos',
  templateUrl: './tiempos.component.html',
  styles: []
})
export class TiemposComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  tiempos: any = [];
  cargando = false;
  showNavegacion = false;

  constructor(public _tiemposService: TiempoService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.cargarTiempos();
    this.store.dispatch( new timeActions.LoadTimerAction() );
  }

  cargarTiempos () {
    this.cargando = true;
    this._tiemposService.cargarTiempos( this.desde )
    .subscribe( (resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].TotalRegistros;
        this.showNavegacion = this.totalRegistros >= 15;
        this.tiempos = resp;
      }
      this.cargando = false;
    });
  }

  actualizarTiempo (tiempo: any) {
    this._tiemposService.modificarTiempo( tiempo )
        .subscribe( usr => {
          this.store.dispatch( new timeActions.LoadTimerAction() );
          swal('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

  crear() {

    swal({
      title: 'Crear Duración',
      text: 'Ingrese los minutos',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: number ) => {

      if ( !valor || valor === 0 ) {
        return;
      }

      this._tiemposService.guardarTiempo( valor )
              .subscribe( () => {
                this.store.dispatch( new timeActions.LoadTimerAction() );
                this.cargarTiempos();
                swal('Aviso!', 'Se registrarón los cambios', 'success');
              },
              error => {
                swal('Aviso!', error.error, 'warning');
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
    this.cargarTiempos();

  }

  buscarTiempo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarTiempos();
      return;
    }

    this.cargando = true;

    this._tiemposService.buscarTiempo( termino )
            .subscribe( (soli: Tiempo[]) => {
              this.tiempos = soli;
              this.cargando = false;
            });

  }

}
