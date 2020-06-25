import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TiempoService, UsuarioService, SolicitanteService, TiposService, ServiciosService } from '../../../services/service.index';
import { Servicio, Usuario, Tipo, Tiempo } from '../../../models/models.index';
import * as data from '../../../config/estatus.json';

import swal from 'sweetalert2';


@Component({
  selector: 'app-nuevotpgen',
  templateUrl: './nuevotpgen.component.html',
  styles: [],
  styleUrls: ['../../tickets/ticket.component.css']


})
export class NuevoTPgenComponent implements OnInit {

  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  ticket: Servicio = new Servicio('', '');
  admins: Usuario[];
  users: Usuario[];
  estados: any = data.default;
  tipos: Tipo[];
  duracion: Tiempo;
  cerrado: boolean = false;
  idProyecto : number = 0;

  constructor(public _tiempoService: TiempoService,
    public _adminService: UsuarioService,
    public _soliService: SolicitanteService,
    public _usuarioService: UsuarioService,
    public _servicioService: ServiciosService,
    public router: Router,
    public _tiposService: TiposService,
    public activatedRoute: ActivatedRoute ) {
        activatedRoute.params.subscribe( params => {
          debugger;
          let id = params['id'];
          this.idProyecto = id;
          //try{this.selopt = params['combo'];} catch{}
          //this.cargarDetalles( id );
        });
    } 
    ngOnInit() {
    this.cargarTiempos();
    let date = new Date();
    this.fecCerrado.year = date.getFullYear();
    this.fecCerrado.month = date.getMonth() + 1;
    this.fecCerrado.day = date.getDate();
    this.cargarAdmins();
    this.cargarUsers();
    this.cargarTipos();
    this.ticket.Estado = this.estados.Estatus[2].value;
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
      this.ticket.Duracion = this.duracion[0];
    });
  }

  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: Usuario[]) => {
      this.admins = resp;
      const usr = this.admins.filter( u => u.usuario === this._usuarioService.usuario.usuario);
      this.ticket.AsignadoA = usr[0];
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
      this.ticket.TipoServicio = resp[1];
    });
  }

  estatusChange ( ) {
    if ( this.ticket.Estado === this.estados.Estatus[2].value ) {
      this.cerrado = false;
    } else {
      this.cerrado = true;
    }

  }

  guardar ( f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    if ( this.ticket.Solicitor.id === 0 ) {
      swal.fire('Advertencia', 'Debe seleccionar el solicitor', 'warning');
      return;
    }
    if ( this.ticket.Estado == 'Cerrada' && (this.ticket.Solucion == '' || this.ticket.Solucion == undefined)) {
      swal.fire('Advertencia', 'Un ticket cerrado debe de tener solucion', 'warning');
      return;
    }
    if ( this.ticket.Estado == 'Cerrada' && (this.ticket.Duracion == undefined || this.ticket.Duracion == null || this.ticket.Duracion.Descripcion == "Sin Tiempo")) {
      swal.fire('Advertencia', 'Debe seleccionar tiempo', 'warning');
      return;
    }
    this.ticket.TipoServicio.id = 11;
    this.ticket.proyecto = this.idProyecto;
    this.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this._servicioService.guardarServicio( this.ticket.Solicitor.id, this.ticket )
    .subscribe(
      (resp: any) => { this.router.navigate(['/detallepro/'+ this.idProyecto]);
    },
    error => {
      swal.fire('Aviso!', error.error, 'warning');
    });

  }

}
