import {map, filter} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SolicitanteService, TiempoService, ServiciosService, UsuarioService } from '../../services/service.index';
import { Usuario, Tiempo, Servicio } from '../../models/models.index';
import swal from 'sweetalert2';

// store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as servActions from '../../store/actions';
import { Parametros } from '../../models/parametros.model';

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
  range: Parametros = new Parametros();

  constructor(private router: Router,
              public title: Title,
              public store: Store<AppState>,
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
        this.store.dispatch( new servActions.LoadUsersAction() );
        this.store.dispatch( new servActions.LoadTimerAction() );
      }
    });
  }

  getDataRoute() {
    return this.router.events.pipe(
        filter( evento => evento instanceof ActivationEnd  ),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
        map( (evento: ActivationEnd) => evento.snapshot.data ));
  }

  ngOnInit() {
    this.store.select('marcadores')
    .subscribe( principal => {
      this.range = principal.param;
    });
  }


  cargarSolicitante( ) {
    this.store.select('solicitantes')
    .subscribe( solic => {
      this.users = solic.users;
    });
  }

  cargarTiempos() {
    this.store.select('tiempos')
    .subscribe( solic => {
      this.duracion = solic.tiempos;
    });
  }

  guardar( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.ticket.Solicitor.id === 0 ) {
      swal.fire('Advertencia', 'Debe seleccionar el solicitor', 'warning');
      return;
    }
    if ( this.ticket.Duracion.Descripcion == "Sin Tiempo") {
      swal.fire('Advertencia', 'Debe seleccionar tiempo', 'warning');
      return;
    }
    this._servicioService.guardaTicketRapido( this.ticket )
    .subscribe((resp: any) => {
      this.store.dispatch( new servActions.LoadServAction() );
      this.store.dispatch( new servActions.LoadMarkAction( this.range ) );
      this.ticket = new Servicio('', '');
      this.ticket.Duracion = this.duracion[0];
      swal.fire('Correcto!', 'Se registró el servicio', 'success');
    }, error => {
      swal.fire('Aviso!', error.error, 'warning');
    });
  }

}
