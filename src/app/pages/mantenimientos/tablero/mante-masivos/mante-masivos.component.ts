import { Component, OnInit } from '@angular/core';
import { ZonasService, MantenimientoService } from '../../../../services/service.index';
import { Zonas } from '../../../../models/mantenimientos/zonas.model';
import { Mantenimiento } from '../../../../models/mantenimientos/mantenimiento.model';
import { TicketMante } from '../../../../models/mantenimientos/mante-ticket.model';
import { Servicio } from '../../../../models/servicio.model';
import { Tiempo } from '../../../../models/tiempo.model';
import { Usuario } from '../../../../models/usuario.model';
import { TiempoService } from '../../../../services/tiempo/tiempo.service';
import { SolicitanteService } from '../../../../services/solicitante/solicitante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mante-masivos',
  templateUrl: './mante-masivos.component.html',
  styles: []
})
export class ManteMasivosComponent implements OnInit {

  zonas: Zonas[] = [];
  mantes: Mantenimiento[] = [];
  manteSel: Mantenimiento = null;
  tickets: TicketMante[] = [];
  duracion: Tiempo = null;
  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  users: Usuario[] = null;

  constructor(public zonaService: ZonasService,
    public _tiempoService: TiempoService,
    public _soliService: SolicitanteService,
    public manteService: MantenimientoService) { }

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarZonas() {
    this.zonaService.cargarZonas()
    .subscribe((data: Zonas[]) => {
      this.zonas = data;
    });
  }

  cargarEquipos() {
    this.manteService.cargarMantenimientos()
    .subscribe((data: Mantenimiento[]) => {
      this.mantes = data;
    });
  }

  cargarMante() {
    if ( this.manteSel !== null) {
      this.manteService.cargarMante( this.manteSel.id )
      .subscribe((data: Mantenimiento) => {
        this.cargarTiempos();
        this.cargarUsers();
        let fecCerrado: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        this.tickets.push( new TicketMante( 0, new Date(), new Servicio(), data, fecCerrado ));
      });
    }
  }

  borrar( index: number ) {
    this.tickets.splice( index, 1 );
  }

  guardarTodo() {
    for ( let tick of this.tickets ) {
      if ( tick.ticket.Solicitor.id === 0 ) {
        swal.fire('Seleccionar el Solicitante', tick.mante.equipo.Nombre, 'warning');
        return;
      }
      tick.fecMante = new Date(tick.fecCerrado.year, tick.fecCerrado.month - 1, tick.fecCerrado.day);
    }
    this.manteService.guardarListado( this.tickets )
    .subscribe(() => {
      this.tickets = [];
    });
  }

  cargarTiempos() {
    if ( this.duracion === null ) {
      this._tiempoService.cargarTiemposActivos()
      .subscribe( (resp: any) => {
        this.duracion = resp;
      });
    }
  }

  cargarUsers ( ) {
    if ( this.users === null ) {
      this._soliService.cargarSoliActivos( )
      .subscribe( (resp: any) => {
        this.users = resp;
      });
    }
  }

}
