import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(public http: HttpClient) { }

  cargarContadores( rango: string) {
    const url = URL_SERVICIOS + '/contadores?rango=' + rango;
    return this.http.get( url );
  }

  cargarTopSolicitantes( rango: string ) {
    const url = URL_SERVICIOS + '/grafica/top?rango=' + rango;
    return this.http.get( url );
  }

  cargarTopRating( rango: string ) {
    const url = URL_SERVICIOS + '/grafica/rating?rango=' + rango;
    return this.http.get( url );
  }

}
