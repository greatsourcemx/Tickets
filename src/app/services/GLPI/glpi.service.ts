import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Responsiva } from '../../models/responsiva.model';

@Injectable()
export class GlpiService {

  constructor(public http: HttpClient) { }

  cargarEntregaGLPI( empresa: string ) {
    const url = URL_SERVICIOS + '/glpi/equipos?empresa=' +  empresa;
    return this.http.get( url );
  }

  guardarResponsiva( responsiva: Responsiva ) {
    const url = URL_SERVICIOS + '/glpi/responvia';
    return this.http.post( url, responsiva )
    .map((data: any) => {
      return data;
    });
  }

}
