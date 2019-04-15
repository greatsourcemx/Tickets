import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SolicitanteService, TiempoService, ServiciosService, UsuarioService } from '../../services/service.index';
import { Usuario, Tiempo, Servicio } from '../../models/models.index';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  usuario: Usuario = new Usuario();
  ticket: Servicio = new Servicio('', '');
  users: Usuario[];
  duracion: Tiempo[];
  label: string = '';

  constructor(private router: Router,
              public title: Title,
              public usuarioService: UsuarioService,
              public _tiempoService: TiempoService,
              public _soliService: SolicitanteService,
              public _servicioService: ServiciosService,
              public meta: Meta) {
                this.cargarUsuario();
                this.getDataRoute()
                .subscribe( data => {
                  this.label = data.titulo;
                  this.title.setTitle( this.label );
                  let metaTag: MetaDefinition = {
                    name: 'description',
                    content: this.label
                  };
                  this.meta.updateTag(metaTag);
                });
  }

  cargarUsuario() {
    this.usuarioService.cargarLoagueado()
    .subscribe((data: Usuario) => {
      this.usuario = data;
      if (this.usuario.rolId === 1) {
        this.cargarSolicitante();
        this.cargarTiempos();
      }
    });
  }

  getDataRoute() {
    return this.router.events
        .filter( evento => evento instanceof ActivationEnd  )
        .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
        .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

  ngOnInit() {
  }

  cargarSolicitante( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTiempos() {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
      this.ticket.Duracion = this.duracion[0];
    });
  }

  guardar( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.ticket.Solicitor.id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el solicitor', 'warning');
      return;
    }
    this._servicioService.guardaTicketRapido( this.ticket )
    .subscribe((resp: any) => {
      this.ticket = new Servicio('', '');
      this.ticket.Duracion = this.duracion[0];
      swal('Correcto!', 'Se registró el servicio', 'success');
    }, error => {
      swal('Aviso!', error.error, 'warning');
    });
  }

}
