import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Servicio } from '../../models/servicio.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiciosService {

  servicio: Servicio;

  constructor(public http: HttpClient) { }

  cargarServiciosNuevos() {
    let url = URL_SERVICIOS + '/Servicios';
    return this.http.get( url );
  }

  cargarServicios( id: number = 0 ) {
    let url = URL_SERVICIOS + '/Servicios/' + id;
    return this.http.get( url );
  }

  cargarDetalles ( id: number, numero: number ) {
    let url = URL_SERVICIOS + '/Servicios/' + id + '?numero=' + numero;
    return this.http.get( url );
  }

  guardarServicio ( Soliid: number = 0, servicio: Servicio ) {
    let url = URL_SERVICIOS + '/Servicios/' + Soliid;

    return this.http.post( url, servicio )
    .map( (resp: any) => {
      swal('Ticket Creado', servicio.Titulo, 'success');
      return resp;
    });
  }

  modificarServicio (ticket: Servicio) {
    let url = URL_SERVICIOS + '/Servicios';

    return this.http.put( url, ticket )
    .map( (resp: any) => {
      swal('Ticket Actualizado', ticket.Titulo, 'success');
      return resp;
    });
  }

  cargarTickets ( id: number = 0) {
    let url = URL_SERVICIOS + '/Tickets/' + id;
    return this.http.get( url );
  }

  cargarDetTickets ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/Tickets?folio=' + id;
    return this.http.get( url );
  }

  cargarInfoPrincipal ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/Principal/' + id;
    return this.http.get( url );
  }

  cargarTicketsTrabajo ( servicio: Servicio ) {
    let url = URL_SERVICIOS + '/Tickets';
    return this.http.post( url, servicio );
  }

  cargarTicketsCerrados (servicio: Servicio) {
    let url = URL_SERVICIOS + '/Tickets/1';
    return this.http.put( url, servicio );
  }

}
