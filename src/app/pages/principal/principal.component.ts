import { Component, OnInit } from '@angular/core';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Servicio, Principal, Usuario } from '../../models/models.index';
import * as data from '../../config/estatus.json';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  servNuevos: any = [];
  myTickets: any = [];
  estados: any = data;
  admins: Usuario[];
  users: Usuario[];

  principal: Principal = new Principal(0, 0, 0, '');

  constructor(
    public _servicioService: ServiciosService,
    public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarInfoPrincipal();
    this.cargarNuevos();
    this.cargarTickets();
  }

  cargarInfoPrincipal () {
    this._servicioService.cargarDashboard()
    .subscribe( (resp: any) => {
      this.principal = resp;
    });
  }

  cargarNuevos () {
    this._servicioService.cargarServiciosNuevos()
      .subscribe(  (resp: any) => {
        this.servNuevos = resp;
      });
  }

  cargarTickets ( ) {
    this._servicioService.cargarTickets()
    .subscribe( (resp) => {
      this.myTickets = resp;
    });
  }

}
