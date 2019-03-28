import { Component, OnInit } from '@angular/core';
import { Servicio, Usuario, Tipo } from '../../models/models.index';
import { ServiciosService, UsuarioService, SolicitanteService, TiposService } from '../../services/service.index';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styles: []
})
export class TrabajosComponent implements OnInit {

  admins: Usuario[];
  users: Usuario[];
  tipos: Tipo[];
  Tickets: Servicio[];
  filtros: Servicio = new Servicio('');
  totalRegistros: number = 0;
  cargando = false;
  showNavegacion = false;

  constructor(
    public _servicioService: ServiciosService,
    public _soliService: SolicitanteService,
    public _adminService: UsuarioService,
    public _tiposService: TiposService ) { }

  ngOnInit() {
    this.cargarTickets();
    this.cargarUsers();
    this.cargarAdmins();
    this.cargarTipos();
  }

  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: any) => {
      this.admins = resp;
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTickets() {
    this.cargando = true;
    this._servicioService.cargarTicketsTrabajo( this.filtros )
    .subscribe((resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].Total;
      }
      this.showNavegacion = this.totalRegistros >= 15;
      this.Tickets = resp;
      this.cargando = false;
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
    });
  }

  quitarFiltros () {
    this.filtros = new Servicio('');
    this.cargarTickets();
  }

  cambiarDesde( valor: number ) {

    let desde = this.filtros.desde + valor;
    let totalPages = Math.ceil(this.totalRegistros / 15);

    if ( desde >= totalPages ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.filtros.desde += valor;
    this.cargarTickets();

  }

}
