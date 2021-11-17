import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiciosService, TiempoService, UsuarioService, SolicitanteService, TiposService } from '../../services/service.index';
import { Servicio, Tiempo, Usuario, Tipo } from '../../models/models.index';
import { ActivatedRoute, Router } from '@angular/router';
import * as data from '../../config/estatus.json';
import swal from 'sweetalert2';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styles: []
})
export class TicketsComponent implements OnInit {

  duracion: Tiempo;
  ticket: Servicio = new Servicio('');
  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  admins: Usuario[];
  users: Usuario[];
  estados: any = data.default;
  tipos: Tipo[];
  esSoporte = false;
  public selopt: string = '';
  constructor(
    public _ticketService: ServiciosService,
    public _tiempoService: TiempoService,
    public _adminService: UsuarioService,
    public _soliService: SolicitanteService,
    public _tiposService: TiposService,
    public router: Router,
    public activatedRoute: ActivatedRoute ) {
      activatedRoute.params.subscribe( params => {
        debugger;
        let id = params['id'];
        try{this.selopt = params['combo'];} catch{}
        this.cargarDetalles( id );
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
    //this.ticket.Solicitor
  }

  regresar() {
    let url = localStorage.getItem('url');
    this.router.navigate([url]);
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
    .subscribe( (resp: any) => {
      this.admins = resp;
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
      debugger;
      var user = JSON.parse(localStorage.usuario);
      for (let i = 0; i < resp.length; i++) {
        if(user.usuario == resp[i].usuario){
          if (this.ticket.AsignadoA.usuario == null || this.ticket.AsignadoA.usuario == ""){
            this.ticket.AsignadoA = resp[i];
          }
         
        }
      }
    });
  }

  cargarDetalles ( id: number = 0 ) {
    this._ticketService.cargarDetTickets(id)
    .subscribe( (resp: any) => {
      this.ticket = resp;
      if ( this.ticket.Estado === this.estados.Estatus[0].value && this.ticket.AsignadoA.id === 0 ) {
        this.ticket.AsignadoA = this._adminService.usuario;
      }
      if ( this.selopt != "" ) {
        this.ticket.Estado = this.estados.Estatus[0].value;
      }else{
        this.ticket.Estado = this.estados.Estatus[2].value;
      }
      
      this.esSoporte = !(this.ticket.TipoServicio.id === 1);
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
    });
  }

  guardar ( f: NgForm ) {
    $('#btnenviar').hide()
    debugger;
    if (f.invalid) {
      $('#btnenviar').show();
      return;
    }
    if(this.ticket.Solucion == "" || this.ticket.Solucion == undefined){
      swal.fire('Advertencia!', 'Por favor capture Solucion', 'warning');
      $('#btnenviar').show();
      return;
    }
    this.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this._ticketService.modificarServicio( this.ticket )
    .subscribe( (resp: any) => { 
      $('#btnenviar').show();
      this.router.navigate(['/principal']); 
    });
   }

}
