import { Component, OnInit } from '@angular/core';
import { PrioridadService } from '../../services/service.index';
import { Prioridad } from '../../models/Prioridad.model';

declare var swal: any;

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styles: []
})
export class PrioridadComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  prioridades: any= [];

  constructor( public _prioridadService: PrioridadService ) { }

  ngOnInit() {
    this.cargarPrioridades();
  }

  cargarPrioridades () {
    this.cargando = true;

    this._prioridadService.cargarPrioridades()
        .subscribe( (resp: any) => {
          if (resp.length !== 0) {
            this.totalRegistros = resp[0].Total;
            this.prioridades = resp;
          }
          this.cargando = false;
        });
  }

  guardarPrioridad () {

    swal({
      title: 'Crear Prioridad',
      text: 'Ingrese el nombre',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor ) {
        return;
      }

      let prioridad: Prioridad = new Prioridad( valor );

      this._prioridadService.guardarPrioridad( prioridad )
              .subscribe( () => {
                this.cargarPrioridades();
              },
              error => {
                swal('Aviso!', error.error, 'warning');
              });

    });
  }

  modificarPrioridad ( prioridad: Prioridad ) {
    this._prioridadService.modificarPrioridad( prioridad )
        .subscribe( () => {
          this.cargarPrioridades();
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
    this.cargarPrioridades();

  }

  buscarTiempo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPrioridades();
      return;
    } else if ( termino.length >= 3 ) {
      this.cargando = true;
      this._prioridadService.buscarPrioridad( termino )
              .subscribe( (soli: Prioridad[]) => {
                this.prioridades = soli;
                this.cargando = false;
              });
    }
  }

}
