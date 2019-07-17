import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Zonas } from '../../models/models.index';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  url = URL_SERVICIOS + '/zonas';

  constructor( public http: HttpClient) { }

  cargarZonas() {
    return this.http.get( this.url );
  }

  guardar( zona: Zonas ) {
    return this.http.post( this.url, zona ).pipe(
      map((data: any) => {
        swal('Zona Creada', zona.nombre, 'success');
        return data;
      })
    );
  }

  modificar( zona: Zonas ) {
    return this.http.put( this.url, zona ).pipe(
      map((data: any) => {
        swal('Zona modificada', zona.nombre, 'success');
        return data;
      })
    );
  }
}
