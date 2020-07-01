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
  selector: 'app-editardes',
  templateUrl: './editardes.component.html',
  styles: []
})
export class EditarDesComponent implements OnInit {

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
  server: string= '';
  instance: string= '';
  database: string= '';
  auxver : string = '';
  tecnologias: Tecnologia[] = [];
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
  cargarTecnologias (id) {
    this._ProyectoService.cargarTecnologias(this.proyecto.Tipo, id)
    .subscribe( (resp: any) => {
      this.tecnologias = resp;
    });
  }
  regresar() {
    let url = localStorage.getItem('url');
    this.router.navigate([url]);
  }
  public changeCheck(value , nombre){
        for (let i = 0; i < this.tecnologias.length; i++) {
          if(this.tecnologias[i].id == nombre.id){
            this.tecnologias[i].Estado = value.target.checked;
          }
        }
    }
    public changeact(value){
        this.proyecto.Estado = value.target.checked;
       
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
    this.cargarTecnologias(id);
    this._ProyectoService.cargarDesarrollo(id)
    .subscribe( (resp: any) => {
      this.proyecto = resp;
      var aux=0;
     try{aux =Number(this.proyecto.Version) + .1}catch{}
     this.auxver = this.proyecto.Version;
     this.proyecto.Version = aux.toFixed(1).toString();
    try{
        debugger;
        var base =resp.BaseDatos.split("/");
        try{this.server = base[0]}catch{}
        try{this.instance = base[1]}catch{}
        try{this.database = base[2]}catch{}
        //$( "#agcheck" ).prop( "checked", true );
        if(this.proyecto.Tipo == 'd'){
          var tecnos =resp.Tecnologias.split(',');
          this.tecnologias;
          for (let i = 0; i < this.tecnologias.length; i++) {
              for (let z = 0; z < tecnos.length; z++) {
                  try{
                      if(tecnos[z].trim() == this.tecnologias[i].Nombre){
                          $( "#"+this.tecnologias[i].NombreCheck ).prop( "checked", true );
                          this.tecnologias[i].Estado = true;
                      }
                  }catch{}
              }
          }
        }else{
          $("#tecnodiv").hide();
          $("#sistemdiv").hide();
        }
        
        if(resp.Estado == "false"){
              $( "#activocheck" ).prop( "checked", false );
        }else{
                $( "#activocheck" ).prop( "checked", true );
            }
    }catch{}
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
    });
  }
  GuardaVersion(){
    debugger;
    this._ProyectoService.actualizaVersion( this.proyecto )
    .subscribe( (resp: any) => { 
        this.router.navigate(['/mantenimiento/softwaredes']); 
        swal.fire('Aviso!', 'Se registrarón los cambios', 'success');
    });
  }
  guardar ( f: NgForm ) {
    debugger;
    if (f.invalid) {
      return;
    }
    this.proyecto.Version = this.auxver;
    this.proyecto.BaseDatos = $('#server').val() + "/"+ $('#instancia').val() + "/" +$('#database').val();
    this.proyecto.Tecno = this.tecnologias;
    this.ticket.FecCerrado = new Date(this.fecCerrado.year, this.fecCerrado.month - 1, this.fecCerrado.day);
    this._ProyectoService.actualizaProyecto( this.proyecto )
    .subscribe( (resp: any) => { 
      if(this.proyecto.Tipo=='d'){
        this.router.navigate(['/mantenimiento/softwaredes']);
      }else{
        this.router.navigate(['/mantenimiento/proyectogen']);
      }
        swal.fire('Aviso!', 'Se registrarón los cambios', 'success');

    });
  }
  

  
}
