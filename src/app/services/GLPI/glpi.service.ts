
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Responsiva } from '../../models/responsiva.model';
import { GLPIEmpleado } from '../../models/GLPIEmpleado.model';
import { RetornoEquipo } from '../../models/retorno.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class GlpiService {

  constructor(public http: HttpClient) { }

  cargarEmpleadoGLPI() {
    const url = URL_SERVICIOS + '/glpi/empleado';
    return this.http.get( url );
  }

  cargarEntregaGLPI( empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/equipos?empresa=' +  empresa;
    return this.http.get( url );
  }

  cargarTodosEmpleados() {
    const url = URL_SERVICIOS + '/glpi/all';
    return this.http.get( url );
  }

  cargarEquipoEmpleado( empleado: GLPIEmpleado, empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/empleados/responsivas?id=' + empleado.Id + '&empresa=' + empresa;
    return this.http.get( url );
  }

  cargarTodoEquipoEmpleado( empleado: GLPIEmpleado) {
    const url = URL_SERVICIOS + '/glpi/all';
    return this.http.post( url, empleado ).pipe(
    map((data: any) => {
      return data;
    }));
  }

  cargarSolicitantes( empr: string, desde = 0, termino = '' ) {
    let url = URL_SERVICIOS + '/glpi/solicitantes?empr=' + empr + '&desde=' + desde;
    if ( termino !== '' ) {
      url += '&termino=' + termino;
    }
    return this.http.get( url );
  }
  cargarAgenda( empr: string) {
    let url = URL_SERVICIOS + '/glpi/agenda?empr=' + empr;
    return this.http.get( url );
  }
  cargarNuevosSolicitantes( empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/soli/nuevos?empr=' + empresa;
    return this.http.get( url );
  }

  generarSolicitante( empresa: string, empleado: GLPIEmpleado ) {
    const url = URL_SERVICIOS + '/solicitante/crear?empr=' + empresa;
    return this.http.post( url, empleado ).pipe(
    map((data: any) => {
      return data;
    }));
  }
  generarSolicitantes( empresa: string, empleados: GLPIEmpleado[] ) {
    const url = URL_SERVICIOS + '/soli/generar?empr=' + empresa;
    return this.http.post( url, empleados ).pipe(
    map((data: any) => {
      return data;
    }));
  }

  cargarResponsiva( folio: string, empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/responsiva?folio=' + folio + '&empresa=' + empresa;
    return this.http.get( url );
  }

  guardarResponsiva( responsiva: Responsiva ): Observable<HttpResponse<Blob>> {
    const url = URL_SERVICIOS + '/glpi/responsiva';
    return this.http.post<Blob>( url, responsiva, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });

  }

  buscaEquipo( equipo: string ) {
    const url = URL_SERVICIOS + '/glpi/equipo?equipo=' + equipo;
    return this.http.get( url ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  retornarEquipo( equipos: RetornoEquipo[], empr: string, trasnf: boolean = false ) {
    if (trasnf) {
      const url = URL_SERVICIOS + '/glpi/responsiva?empr=' + empr;
      return this.http.put( url, equipos, { responseType: 'blob' } ).pipe(
      map((data: any) => {
          return new Blob([data], { type: 'application/pdf' });
      }));
    } else {
      const url = URL_SERVICIOS + '/glpi/retorno';
      return this.http.post( url, equipos ).pipe(
      map((data: any) => {
        return data;
      }));
    }
  }

  verPDF( responsiva: Responsiva ) {
    const url = URL_SERVICIOS + '/glpi/view';
    return this.http.post( url, responsiva, { responseType: 'blob' } ).pipe(
    map((resp: any) => {
      return new Blob([resp], { type: 'application/pdf' });
    }));
  }

  verPDFFolio( folio: number, empr: string ) {
    const url = URL_SERVICIOS + '/glpi/view?folio=' + folio + '&empr=' + empr;
    return this.http.get( url, { responseType: 'blob' } );
  }

  /* [FIRMAS DE RESPONSIVAS] */

  cargarResponsivasSinFirma( empresa: string ) {
    const url = URL_SERVICIOS + '/sinfirma?empr=' + empresa;
    return this.http.get( url );
  }

  guardarFirmas( responsivas: Responsiva[] ) {
    const url = URL_SERVICIOS + '/sinfirma';
    return this.http.post( url, responsivas ).pipe(
    map((data: any) => {
      return data;
    }));
  }

}
