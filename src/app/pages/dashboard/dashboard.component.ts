import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Servicio } from '../../models/servicio.model';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import * as data from '../../config/estatus.json';

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

  constructor(
    public _serviciosService: ServiciosService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarServicios();
  }

  cargarServicios(  ) {

    this.cargando = true;
    this._serviciosService.cargarServicios(this.usuario.id)
    .subscribe( (resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].TotalRegistros;
        this.servicios = resp;
      }
      this.cargando = false;
    });
  }

  totalAbiertos(): number {

    let i: number = 0;
    this.servicios.forEach( (servi: Servicio) => {
      if ( servi.Estatus === this.estados.Estatus[0].value ) {
        i++;
      }
    });
    return i;
  }

  totalProceso(): number {

    let i: number = 0;
    this.servicios.forEach( (servi: Servicio) => {
      if ( servi.Estatus === this.estados.Estatus[1].value ) {
        i++;
      }
    });
    return i;
  }

}
