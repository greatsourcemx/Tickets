import swal from 'sweetalert';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Avances } from '../../models/avances.model';

@Injectable()
export class AvancesService {

  constructor( public http: HttpClient ) { }

  cargarAvances ( id: number = 0 ) {
    let url = URL_SERVICIOS + '/avances?id=' + id;

    return this.http.get( url );
  }

  guardarAvance( avance: Avances ) {
    let url = URL_SERVICIOS + '/Avances';

    return this.http.post( url, avance ).pipe(
    map( (resp: any) => {
      swal('Info', 'Se agregó el avance', 'success');
      return resp;
    }));
  }

}
