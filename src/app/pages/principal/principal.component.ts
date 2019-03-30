import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Principal, Usuario } from '../../models/models.index';

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

  constructor(
    public _servicioService: ServiciosService,
    public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarInfoPrincipal();
    this.cargarNuevos();
    this.cargarTickets();
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

  cargarTickets ( ) {
    this._servicioService.cargarTickets()
    .subscribe( (resp) => {
      this.myTickets = resp;
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

}
