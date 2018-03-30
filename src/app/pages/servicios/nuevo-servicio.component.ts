import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiciosService, UsuarioService, PrioridadService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.model';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styles: []
})
export class NuevoServicioComponent implements OnInit {

  servicio: Servicio = new Servicio('', '');
  usuario: Usuario;
  prioridades: any= [];
  nuevo: boolean = true;

  constructor(
    public _servicioService: ServiciosService,
    public _usuarioService: UsuarioService,
    public _prioridadService: PrioridadService
   ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarPrioridades();
  }

  cargarPrioridades () {
    this._prioridadService.cargarActivos()
        .subscribe( (resp: any) => {
          this.prioridades = resp;
        });
  }

  guardarServicio( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._servicioService.guardarServicio(this.usuario.id, this.servicio )
            .subscribe( usuario => {
              swal('Servicio Creado', this.servicio.Titulo, 'success' );
              this.nuevo = false;
            },
            error => {
              swal('Aviso!', error.error, 'warning');
            });

  }

}
