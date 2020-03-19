import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ServiciosService, UsuarioService, TiposService } from '../../services/service.index';
import * as data from '../../config/estatus.json';
import { Principal, Servicio, Parametros } from '../../models/models.index';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as markActions from '../../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css']
})
export class DashboardComponent implements OnInit {

  query: string = '';
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
              public config: NgbRatingConfig,
              public _tiposService: TiposService ) { }

  ngOnInit() {
    this.config.max = 5;
    this.usuario = this._usuarioService.usuario;
    this.cargarDashboard();
    this.cargarServicios();
    this.store.dispatch( new markActions.LoadServSoliAction( this.desde ) );
    this.store.dispatch( new markActions.LoadMarkAction( new Parametros() ) );
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

  cancelar( serv: Servicio, cancel: boolean ) {
    let titulo = cancel ? '¿Cancelar Ticket?' : '¿Cerrar el Ticket?';
    swal.fire({
      title: titulo,
      text: serv.Id + ' ' + serv.Titulo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06d79c',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#398bf7',
    }).then((result) => {
      if (result.value) {
        this.cancelarTicket( serv, cancel );
      }
    });
  }

  cancelarTicket( srv: Servicio, cancel: boolean ) {
    if ( cancel ) {
      this._serviciosService.cancelar( srv )
      .subscribe(() => {
        this.store.dispatch( new markActions.LoadServSoliAction( this.desde ) );
        swal.fire(srv.Id + ' : ' + srv.Titulo, 'Se ha cancelado', 'success');
      });
    } else {
      this._serviciosService.cerrar( srv )
      .subscribe(() => {
        this.store.dispatch( new markActions.LoadServSoliAction( this.desde ) );
        swal.fire(srv.Id + ' : ' + srv.Titulo, 'Se ha cerrado', 'success');
      });
    }
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
    this.store.dispatch( new markActions.LoadServSoliAction( this.desde ) );
    this.cargarServicios();
  }

}
