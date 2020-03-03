import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../services/service.index';
import { Mantenimiento } from '../../models/mantenimientos/mantenimiento.model';
import { GlpiService } from '../../services/GLPI/glpi.service';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import * as data from '../../config/estados.json';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: []
})
export class AgendaComponent implements OnInit {

  cargando: boolean = false;
  mantes: Mantenimiento[] = null;
  solicitantes: Usuario[] = [];
  Empresas: Empresa[] = [];
  estados: any = data.default;
  empresa = 'EBR';
  desde: number = 0;
  totalRegistros: number = 0;
  showNavegacion = false;
  //dtTrigger: Subject = new Subject();

  constructor(public _manteServices: MantenimientoService
    , public glpiServicio: GlpiService
    ) { }

  ngOnInit() {
    this.cargarAgenda();
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
  cargarAgenda () {
    this.cargando = true;
    this.glpiServicio.cargarAgenda('EBR')
    .subscribe( (resp: any) => {
      this.cargando = false;
      this.solicitantes = resp;
     // this.dtTrigger.next();

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
