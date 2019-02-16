import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Servicio } from '../../models/servicio.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class ServiciosService {

  servicio: Servicio;

  constructor(public http: HttpClient) { }

  cargarServiciosNuevos() {
    let url = URL_SERVICIOS + '/nuevos';
    return this.http.get( url );
  }

  cargarTickets () {
    let url = URL_SERVICIOS + '/servicios';
    return this.http.get( url );
  }

  cargarServicios( id: number = 0, desde: number = 0 ) {
    // let url = URL_SERVICIOS + '/Servicios/' + id + '?desde=' + desde;
    let url = URL_SERVICIOS + '/soli/servicios?desde=' + desde;
    return this.http.get( url );
  }

  cargarDetalles ( ServId: number ) {
    let url = URL_SERVICIOS + '/servicio/detalle?id=' + ServId;
    return this.http.get( url );
  }

  guardarServicio ( Soliid: number = 0, servicio: Servicio ) {
    let url = URL_SERVICIOS + '/servicio';

    return this.http.post( url, servicio )
    .map( (resp: any) => {
      swal('Ticket Creado', servicio.Titulo, 'success');
      return resp;
    });
  }

  modificarServicio (ticket: Servicio) {
    let url = URL_SERVICIOS + '/servicio';

    return this.http.put( url, ticket )
    .map( (resp: any) => {
      swal('Ticket Actualizado', ticket.Titulo, 'success');
      return resp;
    });
  }

  cargarDetTickets ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/servicio?folio=' + id;
    return this.http.get( url );
  }

  cargarDashboard () {
    let url = URL_SERVICIOS + '/principal';
    return this.http.get( url );
  }

  cargarTicketsTrabajo ( servicio: Servicio ) {
    let url = URL_SERVICIOS + '/tickets';
    return this.http.post( url, servicio );
  }

  cargarTicketsCerrados (servicio: Servicio) {
    let url = URL_SERVICIOS + '/tickets/cerrados';
    return this.http.post( url, servicio );
  }

}
