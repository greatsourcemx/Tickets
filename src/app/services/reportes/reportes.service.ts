
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Parametros } from '../../models/parametros.model';
import { Rating } from '../../models/rating.model';
import { GraficaAnio } from '../../models/graficaratanio.model';


@Injectable()
export class ReportesService {

  constructor(public http: HttpClient) { }

  obtenerPorcentajes ( params: Parametros ) {
    let url = URL_SERVICIOS + '/reporte/porcentaje';
    return this.http.post( url, params ).pipe(
    map( (resp: any) => {
      debugger;
      return resp;
    }));
  }
  obtenerPorUser ( params: Parametros ) {
    let url = URL_SERVICIOS + '/reporte/porcentajeusuario';
    return this.http.post( url, params ).pipe(
    map( (resp: any) => {
      return resp;
    }));
  }
  obtenerHoras ( params: Parametros ) {
    let url = URL_SERVICIOS + '/reporte/horas';
    return this.http.post( url, params ).pipe(
    map( (resp: any) => {
      return resp;
    }));
  }

  obtenerEvaluaciones( param: Parametros ) {
    const url = URL_SERVICIOS + '/reporte/evaluaciones';
    return this.http.post( url, param ).pipe(
      map((data: Rating[]) => {
        return data;
      }));
  }
  obtenerEvaluacionesGraf( param: Parametros ) {
    const url = URL_SERVICIOS + '/reporte/graficarating';
    return this.http.post( url, param ).pipe(
      map((data: GraficaAnio[]) => {
        return data;
      }));
  }
  obtenerEvaluacionesSemaGraf( param: Parametros ) {
    const url = URL_SERVICIOS + '/reporte/graficaratingsema';
    return this.http.post( url, param ).pipe(
      map((data: GraficaAnio[]) => {
        return data;
      }));
  }
}
