import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SolicitanteService, EmpresasService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
import { GlpiService } from '../../services/GLPI/glpi.service';
import * as data from '../../config/estados.json';
import swal from 'sweetalert2';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styles: []
})
export class SolicitantesComponent implements OnInit {

  solicitantes: Usuario[] = [];
  Empresas: Empresa[] = [];
  estados: any = data.default;
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
    debugger;
    // Asignacion de Empresa
    let emprId = solicitante.empresa.id;
    solicitante.empresa = this.Empresas.find(e => e.id === emprId);
    //solicitante.emprage = this.Empresas.find(e => e.id === emprId);

    this._solicitanteService.modificarSolicitante( solicitante )
        .subscribe( usr => {
          solicitante.password = '';
          swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
  }

  enviarClave( usuario: Usuario ) {
    this._solicitanteService.enviarPassword( usuario )
    .subscribe((resp: any) => {
      swal.fire('Se envio la contraseña', 'a ' + usuario.nombre , 'success');
    });
  }

}
