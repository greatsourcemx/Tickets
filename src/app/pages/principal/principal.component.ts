import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Principal, Usuario } from '../../models/models.index';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as servActions from '../../store/actions';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit, OnDestroy {

  servNuevos: any = [];
  myTickets: any = [];
  admins: Usuario[];
  users: Usuario[];
  principal: Principal = new Principal(0, 0, 0, '');
  query = '';
  intervalo;
  loadingTickets = false;
  error: any;

  constructor(public _servicioService: ServiciosService,
              public store: Store<AppState>,
              public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarTickets();
    this.store.dispatch( new servActions.LoadServAction() );

    this.cargarInfoPrincipal();
    this.cargarNuevos();
    this.intervalo = setInterval( () => {
      this.cargarNuevos();
    }, 60000 );
  }

  cargarInfoPrincipal () {
    this._servicioService.cargarDashboard()
    .subscribe( (resp: any) => {
      this.principal = resp;
    });
  }

  cargarNuevos () {
    this._servicioService.cargarServiciosNuevos()
      .subscribe(  (resp: any) => {
        this.servNuevos = resp;
      });
  }

  cargarTickets( ) {
    this.store.select('servicios')
      .subscribe( tickets => {
        this.myTickets = tickets.tickets;
        this.loadingTickets = tickets.loading;
        this.error = tickets.error;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

}
