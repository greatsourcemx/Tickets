import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { ParametrosMant } from '../../models/mantenimientos/parametros.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  url = URL_SERVICIOS + '/parametro/mant';

  constructor(public http: HttpClient) { }

  cargarParametros() {
    return this.http.get( this.url ).pipe(
      map((data: ParametrosMant) => {
        return data;
      })
    );
  }

  guardar( param: ParametrosMant ) {
    return this.http.put( this.url, param ).pipe(
      map((data: ParametrosMant) => {
        return data;
      })
    );
  }

}
