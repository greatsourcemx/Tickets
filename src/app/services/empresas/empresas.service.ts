import swal from 'sweetalert';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';
import { URL_SERVICIOS } from '../../config/config';


@Injectable()
export class EmpresasService {

  constructor( public http: HttpClient ) { }

  cargarEmpresas ( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/empresa?desde=' + desde;
    return this.http.get( url );
  }

  buscarEmpresa ( termino: string ) {
    let url = URL_SERVICIOS + '/empresa?termino=' + termino;
    return this.http.get( url );
  }

  cargarEmpresasActivas () {
    let url = URL_SERVICIOS + '/empresas';
    return this.http.get( url );
  }


  guardarEmpresa ( empresa: Empresa ) {
    let url = URL_SERVICIOS + '/empresa';

    return this.http.post( url, empresa ).pipe(
                map( (resp: any) => {
                  swal('Empresa Creada', empresa.nombre, 'success');
                  return resp;
                }));
  }

  modificarEmpresa ( empresa: Empresa ) {
    let url = URL_SERVICIOS + '/empresa';

    return this.http.put( url, empresa ).pipe(
                  map( (resp: any) => {
                    swal('Empresa Actualizada', empresa.nombre, 'success');
                    return resp;
                  }));
  }

}
