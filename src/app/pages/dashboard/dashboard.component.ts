import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ServiciosService, UsuarioService, TiposService } from '../../services/service.index';
import * as data from '../../config/estatus.json';
import { Principal } from '../../models/models.index';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as markActions from '../../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  servicios: any = [];
  usuario: Usuario;
  nuevo: boolean = false;
  estados: any = data;
  principal: Principal = new Principal(0, 0, 0, '');
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;

  constructor(public _serviciosService: ServiciosService,
              public _usuarioService: UsuarioService,
              public store: Store<AppState>,
              public _tiposService: TiposService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarDashboard();
    this.cargarServicios();
    this.store.dispatch( new markActions.LoadServSoliAction( this.desde ) );
    this.store.dispatch( new markActions.LoadMarkAction( 'HOY' ) );
  }

  cargarServicios() {
    this.cargando = true;
    this.store.select('servicios')
    .subscribe( resp => {
      if (resp.tickets !== null) {
        if (resp.tickets.length > 0) {
          this.servicios = resp.tickets;
          this.totalRegistros = this.servicios[0].Total;
        }
        this.cargando = false;
      }
    });
  }

  cargarDashboard () {
    this.store.select('marcadores')
    .subscribe( principal => {
      this.principal = principal.principal;
    });
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
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
    this.cargarServicios();

  }

}
