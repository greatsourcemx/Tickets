import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Parametros } from '../../models/parametros.model';

@Injectable()
export class ReportesService {

  constructor(public http: HttpClient) { }

  obtenerPorcentajes ( params: Parametros ) {
    let url = URL_SERVICIOS + '/reporte/porcentaje';
    return this.http.post( url, params )
    .map( (resp: any) => {
      return resp;
    });
  }

  obtenerHoras ( params: Parametros ) {
    let url = URL_SERVICIOS + '/reporte/horas';
    return this.http.post( url, params )
    .map( (resp: any) => {
      return resp;
    });
  }

}
