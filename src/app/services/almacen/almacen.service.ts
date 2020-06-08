import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TicketMante } from '../../models/mantenimientos/mante-ticket.model';
import { Mantenimiento } from './../../models/mantenimientos/mantenimiento.model';
import { Proyectos } from '../../models/mantenimientos/proyectos.model';
import { Almacen } from '../../models/almacen.model';


@Injectable()
export class AlmacenService {

  url = URL_SERVICIOS + '/almacen';

  constructor(public http: HttpClient) { }

  cargarAlmacen () {
    return this.http.get( this.url + '/cargaalmacen' ).pipe(
      map((data: any) => data));
  }
  cargarAllmacen () {
    return this.http.get( this.url + '/cargaallmacen' ).pipe(
      map((data: any) => data));
  }
   cargarCaja (id) {
    return this.http.get( this.url + '/cargacaja?id=' + id ).pipe(
      map((data: any) => data));
  }
  cargarItems (id) {
    return this.http.get( this.url + '/cargaitems?id=' + id ).pipe(
      map((data: any) => data));
  }
  cargarDesarrollo (id) {
    return this.http.get( this.url + '/cproyectos?proyecto=' + id).pipe(
      map((data: any) => data));
  }
  guardaSeccion (nombre) {
    return this.http.get( this.url + '/guardaseccion?seccion=' + nombre).pipe(
      map((data: any) => data));
  }
  guardaCaja (caja, seccion) {
    return this.http.get( this.url + '/guardacaja?caja=' + caja + '&seccion=' + seccion).pipe(
      map((data: any) => data));
  }
  guardaItem (item, cajon) {
  return this.http.get( this.url + '/guardaitem?item=' + item + '&cajon=' + cajon).pipe(
    map((data: any) => data));
}
editarItem (nombre, id) {
return this.http.get( this.url + '/editaritem?nombre=' + nombre + '&id=' + id).pipe(
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
  eliminarItem (itemid, cajaid) {
    return this.http.get( this.url + '/eliminaritem?itemid=' + itemid + '&cajaid=' + cajaid).pipe(
      map((data: any) => data));
    }

}
