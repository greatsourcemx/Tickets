import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Avances } from '../../models/avances.model';

@Injectable()
export class AvancesService {

  constructor( public http: HttpClient ) { }

  cargarAvances ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/Avances/' + id;

    return this.http.get( url );
  }

  guardarAvance( avance: Avances ) {
    let url = URL_SERVICIOS + '/Avances';

    return this.http.post( url, avance )
    .map( (resp: any) => {
      swal('Info', 'Se agregó el avance', 'success');
      return resp;
    });
  }

}
