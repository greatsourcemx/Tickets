import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/models.index';
import { Principal, Servicio, Parametros } from '../../models/models.index';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as servActions from '../../store/actions';
import swal from 'sweetalert2';


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
  query = '';
  intervalo;
  error: any;
  loaded = false;

  constructor(public _servicioService: ServiciosService,
              public store: Store<AppState>,
              public router: Router,
              public _usuarioService: UsuarioService ) {
                this._usuarioService.esAdmin()
                .subscribe((data: boolean) => {
                  if (!data) {
                    this.router.navigate(['/dashboard']);
                  }
                });
              }

  ngOnInit() {
    this.cargarTickets();
    this.store.dispatch( new servActions.LoadServAction() );
    this.cargarNuevos();
    this.intervalo = setInterval( () => {
      this.cargarNuevos();
    }, 60000 );
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
        //this.cancelarTicket( serv, cancel );
      }
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
        this.loaded = tickets.loaded;
        this.error = tickets.error;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  take( id: number ) {
    this._servicioService.take( id ).
    subscribe(() => {
      this.cargarTickets();
      this.store.dispatch( new servActions.LoadServAction() );
      this.cargarNuevos();
    });
  }

}
