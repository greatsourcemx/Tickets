import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  edited: Prioridad = new Prioridad();
  @ViewChild('input') find: ElementRef;

  constructor( public _prioridadService: PrioridadService ) { }

  ngOnInit() {
    this.find.nativeElement.focus();
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

  buscar( termino: string ) {

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

  // autoguardado
  inicial( prio: Prioridad ) {
    this.edited.Descripcion = prio.Descripcion;
    this.edited.Nombre = prio.Nombre;
  }
  final( prio: Prioridad ) {
    if ( prio.Descripcion !== this.edited.Descripcion || prio.Nombre !== this.edited.Nombre ) {
      this.modificarPrioridad( prio );
    }
  }

}
