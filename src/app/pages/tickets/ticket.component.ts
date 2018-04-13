import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TiempoService, UsuarioService, SolicitanteService, TiposService, ServiciosService } from '../../services/service.index';
import { Servicio, Usuario, Tipo, Tiempo } from '../../models/models.index';
import * as data from '../../config/estatus.json';

import swal from 'sweetalert';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit {

  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  ticket: Servicio = new Servicio('', '');
  admins: Usuario[];
  users: Usuario[];
  estados: any = data;
  tipos: Tipo[];
  duracion: Tiempo;
  cerrado: boolean = true;

  constructor(public _tiempoService: TiempoService,
    public _adminService: UsuarioService,
    public _soliService: SolicitanteService,
    public _usuarioService: UsuarioService,
    public _servicioService: ServiciosService,
    public router: Router,
    public _tiposService: TiposService) {
      this.ticket.AsignadoA = this._usuarioService.usuario;
    }

  ngOnInit() {
    this.cargarTiempos();
    let date = new Date();
    this.fecCerrado.year = date.getFullYear();
    this.fecCerrado.month = date.getMonth() + 1;
    this.fecCerrado.day = date.getDate();
    this.cargarAdmins();
    this.cargarUsers();
    this.cargarTipos();
    this.ticket.Estatus = this.estados.Estatus[2].value;
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
      this.ticket.Duracion = this.duracion[0];
    });
  }

  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: any) => {
      this.admins = resp;
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
      this.ticket.TipoServicio = resp[1];
    });
  }

  estatusChange ( ) {
    if ( this.ticket.Estatus === this.estados.Estatus[2].value ) {
      this.cerrado = true;
    } else {
      this.cerrado = false;
    }

  }

  guardar ( f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    if ( this.ticket.Solicitor.id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el solicitor', 'warning');
      return;
    }

    this.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this._servicioService.guardarServicio( this.ticket.Solicitor.id, this.ticket )
    .subscribe(
      (resp: any) => { this.router.navigate(['/principal']);
    },
    error => {
      swal('Aviso!', error.error, 'warning');
    });

  }

}
