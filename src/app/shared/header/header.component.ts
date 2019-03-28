import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, ServiciosService } from '../../services/service.index';
import { Usuario, Servicio } from '../../models/models.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  servicios: Servicio[] = [];
  notifica = false;
  intervalo;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _servicioService: ServiciosService ) {
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    this.cargarNotificaciones();
  }

  ngOnInit() {
    this.intervalo = setInterval( () => {
      this.cargarNotificaciones();
    }, 60000 );
    this.cargarInfo();
  }

  cargarNotificaciones() {
    this._usuarioService.notificaciones( this.servicios )
    .subscribe((data: Servicio[]) => {
      this.servicios = data;
      this.notifica = this.sinLeer();
    });
  }

  cargarInfo () {
    this._usuarioService.cargarLoagueado()
    .subscribe((data: Usuario) => {
      this.usuario = data;
    });
  }

  marcarLeido( serv: Servicio ) {
    serv.leido = true;
    this.notifica = this.sinLeer();
  }

  sinLeer(): boolean {
    for ( const srv of this.servicios ) {
      if ( srv.leido ) {
        return false;
      }
    }
    return this.servicios.length === 0 ? false : true;
  }

  detalle( folio ) {
    this.router.navigate(['/servicio', folio]);
  }

  recargar() {
    this.router.navigate([this.usuario.root]);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

}
