import { Component, OnInit } from '@angular/core';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Servicio, Principal } from '../../models/models.index';
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
    this._servicioService.cargarInfoPrincipal( this._usuarioService.usuario.id )
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
    this._servicioService.cargarTickets( this._usuarioService.usuario.id )
    .subscribe( (resp) => {
      this.myTickets = resp;
    });
  }

}
