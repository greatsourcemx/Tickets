import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Parametros } from '../../models/parametros.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(public http: HttpClient) { }

  cargarContadores( param: Parametros ) {
    debugger;
    const url = URL_SERVICIOS + '/contadores';
    return this.http.post( url, param ).pipe(
      map( (resp: any) => {
        return resp;
      }));
  }

  cargarTopSolicitantes( param: Parametros ) {
    const url = URL_SERVICIOS + '/grafica/top';
    return this.http.post( url, param ).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  cargarTopRating( param: Parametros ) {
    const url = URL_SERVICIOS + '/grafica/rating';
    return this.http.post( url, param ).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  cargarTopHoras( param: Parametros ) {
    const url = URL_SERVICIOS + '/grafica/top-horas';
    return this.http.post( url, param ).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
