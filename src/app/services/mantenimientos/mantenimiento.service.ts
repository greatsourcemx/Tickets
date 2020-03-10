import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TicketMante } from '../../models/mantenimientos/mante-ticket.model';
import { Mantenimiento } from './../../models/mantenimientos/mantenimiento.model';

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
  cargarProyectos () {
    return this.http.get( this.url + '/proyectos' ).pipe(
      map((data: any) => data));
  }
  cargarDesarrollo (id) {
    return this.http.get( this.url + '/cproyectos?proyecto=' + id).pipe(
      map((data: any) => data));
  }
  guardarProyectos (proy: any) {
    return this.http.get( this.url + '/guardaProyecto?proyecto=' + proy ).pipe(
      map((data: any) => data));
  }
  guardarAvance (proy: any) {
    return this.http.get( this.url + '/guardaAvance?proyecto=' + proy ).pipe(
      map((data: any) => data));
  }
  actualizaProyectos (proy: any) {
    return this.http.get( this.url + '/actualizaProyecto?proyecto=' + proy ).pipe(
      map((data: any) => data));
  }
  cargarUltimos( cuantos: number ) {
    return this.http.get( this.url + '/next?cuantos=' + cuantos ).pipe(
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

  inactivaMante( mante: Mantenimiento ) {
    return this.http.put( this.url, mante ).pipe(
      map(() => { })
    );
  }

  guardarMante( mante: TicketMante ) {
    return this.http.post( this.url, mante ).pipe(
      map((data: any) => {
        swal.fire('Mantenimiento Creado', mante.mante.equipo.Nombre, 'success');
        return data;
      })
    );
  }

  guardarListado( mantes: TicketMante[] ) {
    let url = URL_SERVICIOS + '/mantes/all';
    return this.http.post( url, mantes ).pipe(
      map( () => {
        swal.fire('Se guardaron los Mantenimientos', '', 'success');
      })
    );
  }

}
