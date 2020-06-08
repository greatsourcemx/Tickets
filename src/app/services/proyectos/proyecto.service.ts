import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { TicketMante } from '../../models/mantenimientos/mante-ticket.model';
import { Mantenimiento } from './../../models/mantenimientos/mantenimiento.model';
import { Proyectos } from '../../models/mantenimientos/proyectos.model';
import { Proyecto } from '../../models/proyecto.model';


@Injectable()
export class ProyectosService {

  url = URL_SERVICIOS + '/proyectos';

  constructor(public http: HttpClient) { }

  cargarProyectos () {
    return this.http.get( this.url + '/cargaproyectos' ).pipe(
      map((data: any) => data));
  }
  cargarDesarrollo (id) {
    return this.http.get( this.url + '/cproyectos?proyecto=' + id).pipe(
      map((data: any) => data));
  }

  guardarProyectos (proy: any) {
    return this.http.get( this.url + '/guardaProyecto?proyecto=' + Proyecto ).pipe(
      map((data: any) => data));
  }
  crearProyecto (proyecto: Proyecto) {
    debugger;
    let url = this.url + '/crearproyecto';
    return this.http.put( url, proyecto ).pipe(
                map( (resp: any) => {
                  return resp;
                }));
  }
  modificarAvance (proyecto: Proyectos) {
    debugger;
    let url = this.url + '/actualizaAvance';
    return this.http.put( url, proyecto ).pipe(
                map( (resp: any) => {
                  return resp;
                }));
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


}
