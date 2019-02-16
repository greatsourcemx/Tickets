import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Servicio } from '../../models/servicio.model';
import { ServiciosService, UsuarioService, TiposService } from '../../services/service.index';
import * as data from '../../config/estatus.json';
import { Principal } from '../../models/models.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  servicios: any = [];
  usuario: Usuario;
  nuevo: boolean = false;
  estados: any = data;
  principal: Principal = new Principal(0, 0, 0, '');

  constructor(public _serviciosService: ServiciosService,
              public _usuarioService: UsuarioService,
              public _tiposService: TiposService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarDashboard();
    this.cargarServicios();
  }

  cargarServicios(  ) {

    this.cargando = true;
    this._serviciosService.cargarServicios(this.usuario.id, this.desde)
    .subscribe( (resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].Total;
        this.servicios = resp;
      }
      this.cargando = false;
    });
  }

  cargarDashboard () {
    this._serviciosService.cargarDashboard( )
    .subscribe( (resp: any) => {
      this.principal = resp;
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
    this.cargarServicios();

  }

}
