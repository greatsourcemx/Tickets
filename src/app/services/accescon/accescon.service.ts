import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config'; 


@Injectable()
export class AccesoService {

  url = URL_SERVICIOS + '/acceso';

  constructor(public http: HttpClient) { }

  cargarAll () {
      debugger;
    return this.http.get( this.url + '/cargaaccesos' ).pipe(

      map((data: any) => data));
  }
  AgregarAcceso(acc){  
    return this.http.put( this.url + '/guardaacceso', acc ).pipe(
        map( (resp: any) => { 
        return resp;
    }));
  }
  cargaUsuario () {
    return this.http.get( this.url + '/cargausuario').pipe(
      map((data: any) => data));
  }
}
