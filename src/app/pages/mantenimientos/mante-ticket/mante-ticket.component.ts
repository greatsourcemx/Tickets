import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketMante } from '../../../models/mantenimientos/mante-ticket.model';
import { Mantenimiento, Usuario, Tiempo, Servicio } from '../../../models/models.index';
import { TiempoService, SolicitanteService, MantenimientoService } from '../../../services/service.index';

@Component({
  selector: 'app-mante-ticket',
  templateUrl: './mante-ticket.component.html',
  styles: []
})
export class ManteTicketComponent implements OnInit {

  ticketMante: TicketMante = new TicketMante();
  mantes: TicketMante[] = null;
  duracion: Tiempo;
  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  users: Usuario[];

  constructor(public activatedRoute: ActivatedRoute,
              public _tiempoService: TiempoService,
              public _soliService: SolicitanteService,
              public manteService: MantenimientoService) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.cargarMante( id );
    });
  }

  ngOnInit() {
    this.cargarTiempos();
    let date = new Date();
    this.fecCerrado.year = date.getFullYear();
    this.fecCerrado.month = date.getMonth() + 1;
    this.fecCerrado.day = date.getDate();
    this.cargarUsers();
  }

  guardar() {
    this.ticketMante.fecMante = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this.ticketMante.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this.manteService.guardarMante( this.ticketMante )
    .subscribe((data: TicketMante[]) => {
      this.mantes = data;
      this.ticketMante.ticket = new Servicio();
      let date = new Date();
      this.fecCerrado.year = date.getFullYear();
      this.fecCerrado.month = date.getMonth() + 1;
      this.fecCerrado.day = date.getDate();
     });
  }

  cargarHistorial( id: number ) {
    this.manteService.cargarHistorial( id )
    .subscribe((data: TicketMante[]) => {
      this.mantes = data;
    });
  }

  cargarMante( id: number ) {
    this.manteService.cargarMante( id )
    .subscribe((data: Mantenimiento) => {
      this.ticketMante.mante = data;
      this.cargarHistorial( id );
    });
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
      this.ticketMante.ticket.Duracion = this.duracion[0];
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

}
