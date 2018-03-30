import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
declare var swal: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  cargando: boolean = false;
  desde: number = 0;
  totalRegistros: number = 0;
  Empresas: Empresa[] = [];

  constructor( public _empresaService: EmpresasService ) { }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas () {
    this.cargando = true;

    this._empresaService.cargarEmpresas(this.desde)
    .subscribe( (resp: any) => {

      if (resp.length !== 0) {
        this.totalRegistros = resp[0].totalUsuarios;
        this.Empresas = resp;
      }
      this.cargando = false;
    });
  }

  buscarEmpresa (termino: string) {
    this._empresaService.buscarEmpresa(termino)
    .subscribe( (resp: Empresa[]) => {
      this.Empresas = resp;
    });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    let totalPages = Math.ceil(this.totalRegistros / 15);

    if ( desde >= totalPages ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarEmpresas();

  }

  modificarEmpresa (empresa: Empresa) {

    this._empresaService.modificarEmpresa(empresa).subscribe();

  }

  crearEmpresa() {

    swal({
      title: 'Crear Empresa',
      text: 'Ingrese el nombre',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor ) {
        return;
      }

      let empre: Empresa = new Empresa (valor);

      this._empresaService.guardarEmpresa( empre )
              .subscribe( () => {
                this.cargarEmpresas();
              },
              error => {
                swal('Aviso!', error.error, 'warning');
              });

    });

  }

}
