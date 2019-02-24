import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Responsiva } from '../../models/responsiva.model';
import { GLPIEmpleado } from '../../models/GLPIEmpleado.model';
import { RetornoEquipo } from '../../models/retorno.model';

@Injectable()
export class GlpiService {

  constructor(public http: HttpClient) { }

  cargarEntregaGLPI( empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/equipos?empresa=' +  empresa;
    return this.http.get( url );
  }

  cargarEquipoEmpleado( empleado: GLPIEmpleado, empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/empleados/responsivas?id=' + empleado.Id + '&empresa=' + empresa;
    return this.http.get( url );
  }

  cargarResponsiva( folio: string, empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/responsiva?folio=' + folio + '&empresa=' + empresa;
    return this.http.get( url );
  }

  guardarResponsiva( responsiva: Responsiva ) {
    const url = URL_SERVICIOS + '/glpi/responsiva';
    return this.http.post( url, responsiva, { responseType: 'blob' }  )
    .map((data: any) => {
      return new Blob([data], { type: 'application/pdf' });
    });
  }

  retornarEquipo( equipos: RetornoEquipo[], empr: string ) {
    const url = URL_SERVICIOS + '/glpi/responsiva?empr=' + empr;
    return this.http.put( url, equipos )
    .map((data: any) => {
      return data;
    });
  }

  verPDF( responsiva: Responsiva ) {
    const url = URL_SERVICIOS + '/glpi/view';
    return this.http.post( url, responsiva, { responseType: 'blob' } )
    .map((resp: any) => {
      return new Blob([resp], { type: 'application/pdf' });
    });
  }

  verPDFFolio( folio: number, empr: string ) {
    const url = URL_SERVICIOS + '/glpi/view?folio=' + folio + '&empr=' + empr;
    return this.http.get( url, { responseType: 'blob' } );
  }

}
