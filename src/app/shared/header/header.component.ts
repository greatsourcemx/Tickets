import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    public _usuarioService: UsuarioService,
    public _servicioService: ServiciosService ) {
    this.usuario = _usuarioService.usuario;
    this.cargarNotificaciones();
  }

  ngOnInit() {
    let intervalo = setInterval( () => {
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
    return true;
  }

  ngOnDestroy() {
  }

}
