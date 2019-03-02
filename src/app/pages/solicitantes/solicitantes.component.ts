import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SolicitanteService, EmpresasService } from '../../services/service.index';
import * as data from '../../config/estados.json';
import { Empresa } from '../../models/empresa.model';
import { GlpiService } from '../../services/GLPI/glpi.service';
import { GLPIEmpleado } from '../../models/GLPIEmpleado.model';


@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styles: []
})
export class SolicitantesComponent implements OnInit {

  solicitantes: Usuario[] = [];
  empleados: GLPIEmpleado = new GLPIEmpleado();
  Empresas: Empresa[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  estados: any = data;
  empresa = 'EBR';

  constructor(public _solicitanteService: SolicitanteService,
              public glpiServicio: GlpiService,
              public _empresaService: EmpresasService ) { }

  ngOnInit() {
    this.cargando = true;
    this.cargarEmpresas();
    this.cargarSolicitantes();
    this.cargarEmpleados();
  }

  seleccionEmpresa( empr: string ) {
    this.empresa = empr;
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.glpiServicio.cargarEntregaGLPI( this.empresa )
    .subscribe((resp: any) => {
      this.cargando = false;
      this.empleados = resp.Empleados;
      console.log(this.empleados);
    });
  }

  cargarSolicitantes() {

    this.cargando = true;

    this._solicitanteService.cargarSolicitantes( this.desde )
              .subscribe( (resp: any) => {
                if (resp.length !== 0) {
                  this.totalRegistros = resp[0].totalUsuarios;
                  this.solicitantes = resp;
                }
                this.cargando = false;
              });
  }

  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: any) => {
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
    this.cargarSolicitantes();

  }

  buscarSolicitante( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarSolicitantes();
      return;
    }

    this.cargando = true;

    this._solicitanteService.buscarSolicitante( termino )
            .subscribe( (soli: Usuario[]) => {

              this.solicitantes = soli;
              this.cargando = false;
            });

  }

  modificarSolicitante (solicitante: Usuario) {

    // Asignacion de Empresa
    let emprId = solicitante.empresa.id;
    solicitante.empresa = this.Empresas.find(e => e.id === emprId);

    this._solicitanteService.modificarSolicitante( solicitante )
        .subscribe( usr => {
          solicitante.password = '';
          swal('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });
  }

}
