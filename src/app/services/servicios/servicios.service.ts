import swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Servicio } from '../../models/servicio.model';
import { URL_SERVICIOS } from '../../config/config';
import { Rating } from '../../models/rating.model';

@Injectable()
export class ServiciosService {

  servicio: Servicio;

  constructor(public http: HttpClient) { }

  uploadFile( formData: FormData ) {
    const url = URL_SERVICIOS + '/upload';
    return this.http.post( url, formData ).pipe(
      map((data: string[]) => {
        return data;
      }));
  }

  downloadFile( id: number ) {
    const url = URL_SERVICIOS + '/download';
    return this.http.post( url, id, { responseType: 'blob' }  ).pipe(
      map((data: any) => {
        return new Blob([data], { type: 'application/octet-stream' });
      }));
  }

  take( id: number ) {
    const url = URL_SERVICIOS + '/take?id=' + id;
    return this.http.post( url, { } ).pipe(
      map(() => { })
    );
  }

  cargarServiciosNuevos() {
    let url = URL_SERVICIOS + '/nuevos';
    return this.http.get( url );
  }

  cargarTickets () {
    let url = URL_SERVICIOS + '/servicios';
    return this.http.get( url ).pipe(
      map( (resp: Servicio[]) => {
        return resp;
      }));
  }

  cargarServicios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/soli/servicios?desde=' + desde;
    return this.http.get( url ).pipe(
      map( (resp: Servicio[]) => {
        return resp;
      }));
  }

  cargarDetalles ( ServId: number ) {
    let url = URL_SERVICIOS + '/servicio/detalle?id=' + ServId;
    return this.http.get( url );
  }

  guardarServicio ( Soliid: number = 0, servicio: Servicio ) {
    let url = URL_SERVICIOS + '/servicio';
    return this.http.post( url, servicio ).pipe(
      map( (resp: any) => {
        swal.fire('Ticket Creado', servicio.Titulo, 'success');
        return resp;
      }));
  }

  cancelar( serv: Servicio ) {
    const url = URL_SERVICIOS + '/servicio/cancel';
    return this.http.put( url, serv ).pipe(
      map(data =>  {
        return data;
      })
    );
  }

  abrir( srv: Servicio ) {
    const url = URL_SERVICIOS + '/servicio/abrir';
    return this.http.put( url, srv ).pipe(
      map(data =>  {
        return data;
      })
    );
  }

  cerrar( srv: Servicio ) {
    const url = URL_SERVICIOS + '/servicio/cerrar';
    return this.http.put( url, srv ).pipe(
      map(data =>  {
        return data;
      })
    );
  }

  guardaTicketRapido( servicio: Servicio ) {
    const url = URL_SERVICIOS + '/ticket/quick';
    return this.http.post( url, servicio ).pipe(
    map((data: any) => {
      return data;
    }));
  }

  modificarServicio (ticket: Servicio) {
    let url = URL_SERVICIOS + '/servicio';

    return this.http.put( url, ticket ).pipe(
    map( (resp: any) => {
      swal.fire('Ticket Actualizado', ticket.Titulo, 'success');
      return resp;
    }));
  }

  cargarDetTickets ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/servicio?folio=' + id;
    return this.http.get( url );
  }

  cargarDashboard( rango: string ) {
    let url = URL_SERVICIOS + '/principal?param=' + rango;
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

  cargarSinEvaluaciones() {
    let url = URL_SERVICIOS + '/soli/evaluaciones';
    return this.http.get( url );
  }

  guardarEvaluacion( rating: Rating[] ) {
    const url = URL_SERVICIOS + '/rating';
    return this.http.post( url, rating ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
