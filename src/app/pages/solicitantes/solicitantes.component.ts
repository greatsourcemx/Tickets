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
  Empresas: Empresa[] = [];
  empresa = 'EBR';
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  showNavegacion = false;

  constructor(public _solicitanteService: SolicitanteService,
              public glpiServicio: GlpiService,
              public _empresaService: EmpresasService ) {
                this.cargarEmpresas();
              }

  ngOnInit() {
    this.cargando = true;
    this.cargarEmpleados();
  }

  seleccionEmpresa( empr: string ) {
    this.desde = 0;
    this.totalRegistros = 0;
    this.empresa = empr;
    this.cargarEmpleados();
  }

  cargarEmpresas() {
    this.cargando = true;
    this._empresaService.cargarEmpresasActivas()
    .subscribe((resp: Empresa[]) => {
      this.cargando = false;
      this.Empresas = resp;
    });
  }

  cargarEmpleados( termino = '' ) {
    this.glpiServicio.cargarSolicitantes( this.empresa, this.desde, termino )
    .subscribe((resp: any) => {
      this.cargando = false;
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].totalUsuarios;
        this.showNavegacion = this.totalRegistros >= 15;
        this.solicitantes = resp;
      } else {
        this.solicitantes = [];
      }
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
    this.cargarEmpleados();
  }

  buscarSolicitante( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarEmpleados();
      return;
    }
    this.cargarEmpleados( termino );
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

  enviarClave( usuario: Usuario ) {
    this._solicitanteService.enviarPassword( usuario )
    .subscribe((resp: any) => {
      swal('Se envio la contraseña', 'a ' + usuario.nombre , 'success');
    });
  }

}
