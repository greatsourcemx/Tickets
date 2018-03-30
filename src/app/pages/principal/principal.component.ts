import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/service.index';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  servNuevos: any = [];
  myTickets: any = [];

  constructor( public _servicioService: ServiciosService ) { }

  ngOnInit() {
    this.cargarNuevos();
    this.cargarTickets();
  }

  cargarNuevos () {
    this._servicioService.cargarServiciosNuevos()
      .subscribe(  (resp: any) => {
        this.servNuevos = resp;
      });
  }

  cargarTickets ( ) {
    this._servicioService.cargarTickets(1)
    .subscribe( (resp) => {
      this.myTickets = resp;
    });
  }

}
