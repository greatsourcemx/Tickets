import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../services/service.index';
import { Mantenimiento } from '../../models/mantenimientos/mantenimiento.model';
import { GlpiService } from '../../services/GLPI/glpi.service';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import * as data from '../../config/estados.json';
import { SolicitanteService, EmpresasService } from '../../services/service.index';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: []
})
export class AgendaComponent implements OnInit {

  cargando: boolean = false;
  mantes: Mantenimiento[] = null;
  solicitantes: Usuario[] = [];
  empresaUser = '';
  usuario: Usuario[];
  Empresas: Empresa[] = [];
  estados: any = data.default;
  empresa: string;
  desde: number = 0;
  totalRegistros: number = 0;
  showNavegacion = false;
  query = '';
  isAdmin = false;

  constructor(public _manteServices: MantenimientoService, public _usuarioService: UsuarioService, 
    public _solicitanteService: SolicitanteService,
    public glpiServicio: GlpiService
    ) { }

  ngOnInit() {
    this._usuarioService.esAdmin()
    .subscribe((data: boolean) => {
      this.isAdmin = data;
    });
    this.cargarAgenda('EBR');
  }
  seleccionEmpresa( empr: string ) {
    this.desde = 0;
    this.totalRegistros = 0;
    this.empresa = empr;
    this.cargarEmpleados();
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
  

  updateExt (solicitante: Usuario, extension: string) {
    debugger;
    // actualiza Extension
    this._solicitanteService.modificarExtension( solicitante )
        .subscribe( usr => {
          solicitante.password = '';
          swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
  }
  cargarAgenda (empresa : string) {
    debugger;
    this.empresa = empresa;
    let empus ='';
    let jsonUsuario = JSON.parse(localStorage.usuario);
    this.cargando = true;
    this.glpiServicio.cargarAgenda(jsonUsuario['usuario'])
    .subscribe( (resp: any) => {
      this.cargando = false;
      this.solicitantes = resp;
     // this.dtTrigger.next();
    });
  }
  cargarAgendasu (empr: string) {
    this.cargando = true;
    this.empresa = empr;
    this.glpiServicio.cargarAgendaSU(empr)
    .subscribe( (resp: any) => {
      this.cargando = false;
      this.solicitantes = resp;

    });
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  inactivarMante( mante: Mantenimiento, index: number ) {
    this.cargando = true;
    this._manteServices.inactivaMante( mante )
    .subscribe(() => {
      this.mantes.slice( index, 1 );
      this.cargando = false;
    });
  }

}
