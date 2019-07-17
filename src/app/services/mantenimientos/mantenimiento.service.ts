import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TicketMante } from '../../models/mantenimientos/mante-ticket.model';

@Injectable()
export class MantenimientoService {

  url = URL_SERVICIOS + '/mantenimientos';

  constructor(public http: HttpClient) { }

  cargarMante( id: number ) {
    return this.http.get( this.url + '?id=' + id ).pipe(
      map( (resp: any) => resp ));
  }

  cargarMantenimientos () {
    return this.http.get( this.url ).pipe(
    map( (resp: any) => resp ));
  }

  cargarUltimos( cuantos: number ) {
    return this.http.get( this.url + '/last?cuantos=' + cuantos ).pipe(
      map((resp: any) => resp ));
  }

  cargarVencidos() {
    return this.http.get( this.url + '/vencidos' ).pipe(
      map((data: any) => data));
  }

  cargarHistorial( id: number ) {
    const _url = URL_SERVICIOS + '/ticketmante';
    return this.http.get( _url + '?manteId=' + id ).pipe(
      map( (resp: any) => resp ));
  }

  guardarMante( mante: TicketMante ) {
    return this.http.post( this.url, mante ).pipe(
      map((data: any) => {
        swal('Mantenimiento Creado', mante.mante.equipo.Nombre, 'success');
        return data;
      })
    );
  }

  guardarListado( mantes: TicketMante[] ) {
    let url = URL_SERVICIOS + '/mantes/all';
    return this.http.post( url, mantes ).pipe(
      map( () => {
        swal('Se guardaron los Mantenimientos', '', 'success');
      })
    );
  }

}
