import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpresasService {

  constructor( public http: HttpClient ) { }

  cargarEmpresas ( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/Empresa?desde=' + desde;
    return this.http.get( url );
  }

  cargarEmpresasActivas () {
    let url = URL_SERVICIOS + '/Empresa/1';
    return this.http.get( url );
  }

  buscarEmpresa ( termino: string ) {
    let url = URL_SERVICIOS + '/Empresa?termino=' + termino;
    return this.http.get( url );
  }

  guardarEmpresa ( empresa: Empresa ) {
    let url = URL_SERVICIOS + '/Empresa';

    return this.http.post( url, empresa )
                .map( (resp: any) => {
                  swal('Empresa Creada', empresa.nombre, 'success');
                  return resp;
                });
  }

  modificarEmpresa ( empresa: Empresa ) {
    let url = URL_SERVICIOS + '/Empresa';

    return this.http.put( url, empresa )
                  .map( (resp: any) => {
                    swal('Empresa Actualizada', empresa.nombre, 'success');
                    return resp;
                  });
  }

}
