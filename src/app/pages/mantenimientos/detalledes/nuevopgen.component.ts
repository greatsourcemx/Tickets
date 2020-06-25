import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiciosService, TiempoService, UsuarioService, SolicitanteService, TiposService, ProyectosService } from '../../../services/service.index';
import { Servicio, Tiempo, Usuario, Tipo } from '../../../models/models.index';
import { ActivatedRoute, Router } from '@angular/router';
import {Proyecto}  from '../../../models/proyecto.model';
import {Tecnologia}  from '../../../models/tecnologia.model';

import * as data from '../../../config/estatus.json';
import swal from 'sweetalert2';


@Component({
  selector: 'app-nuevopgen',
  templateUrl: './nuevopgen.component.html',
  styles: []
})
export class NuevoDesGenComponent implements OnInit {

  duracion: Tiempo;
  ticket: Servicio = new Servicio('');
  fecCerrado: any = { year: 1800, month: 1, day: 1 };
  admins: Usuario[];
  users: Usuario[];
  estados: any = data.default;
  tipos: Tipo[];
  proyecto : Proyecto = new Proyecto('');
  esSoporte = false;
  Angular = true;
  public wpcheck:boolean;
  public saveUsername:boolean;



  public selopt: string = '';
  constructor(
    public _ticketService: ServiciosService,
    public _ProyectoService: ProyectosService,
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
    debugger;
    if (f.invalid) {
      return;
    }

    this.proyecto.BaseDatos = $('#server').val() + "/"+ $('#instancia').val() + "/" +$('#database').val();
    this.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this._ProyectoService.crearProyectoGen( this.proyecto )
    .subscribe( (resp: any) => { 
      this.router.navigate(['/mantenimiento/proyectogen']); 
      swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
    });
  }

}
