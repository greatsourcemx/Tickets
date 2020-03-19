import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, ServiciosService } from '../../services/service.index';
import { Usuario, Servicio } from '../../models/models.index';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
// store
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as notiActions from '../../store/actions';
import { Parametros } from '../../models/parametros.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuario: Usuario = new Usuario();
  servicios: Servicio[] = [];
  intervalo;
  param: Parametros = new Parametros();
  desde = 0;
  notifica = false;
  loaded = false;
  loading = false;
  rating = 0;

  constructor(public _usuarioService: UsuarioService,
              public router: Router,
              config: NgbRatingConfig,
              public store: Store<AppState>,
              public _servicioService: ServiciosService ) {
                config.max = 5;
                config.readonly = true;
                this.usuario = JSON.parse( localStorage.getItem('usuario') );
                if ( this.usuario.rolId !== 1 ) {
                  this.store.select('servicios')
                  .subscribe( resp => {
                    this.desde = resp.filtro;
                  });
                }
                this.cargarInfo();
                this.store.select('marcadores')
                .subscribe( principal => {
                  this.param = principal.param;
                });
  }

  ngOnInit() {
    if(document.getElementById("logoimg").style.display != "none"){
      document.getElementById("logoimg1").style.display = "none";
    }else{
      document.getElementById("logoimg1").style.display = "";
    }
    this.cargarPromedio();
    this.fire();
    this.cargarNotificaciones();
    this.intervalo = setInterval( () => {
      this.fire();
    }, 60000 );
  }
  cargarPromedio() {
    this._usuarioService.cargarPromedio()
    .subscribe((rsp: any) => {
      this.rating = rsp;
    });
  }

  ocultarimg() {
    if(document.getElementById('logoimg').style.display == 'none'){
      document.getElementById('logoimg1').style.display = 'none';
      document.getElementById('logoimg').style.display = '';
      document.getElementById("imagens").style.backgroundImage="url(../assets/images/background/sidebar-01.png)";
    }else{
      document.getElementById('logoimg1').style.display = '';
      document.getElementById('logoimg').style.display = 'none';
      document.getElementById("imagens").style.backgroundImage="";
    }
  }

  fire() {
    this.store.dispatch( new notiActions.LoadNotificationAction(this.servicios) );
    this.store.dispatch( new notiActions.LoadMarkAction( this.param ) );
    if ( this.usuario.rolId === 1 ) {
      this.store.dispatch( new notiActions.LoadServAction() );
      this.store.dispatch( new notiActions.LoadUsersAction() );
      this.store.dispatch( new notiActions.LoadTimerAction() );
    } else {
      this.store.dispatch( new notiActions.LoadServSoliAction( this.desde ) );
    }
  }

  cargarNotificaciones() {
    this.store.select('notificacion')
    .subscribe( resp => {
      this.servicios = resp.notificaciones;
      this.loaded = resp.loaded;
      this.loading = resp.loading;
      if (this.servicios != null && this.usuario != null) {
        this.notifica = this.sinLeer();
      }
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
    if (this.usuario.rolId === 1) {
      for ( const srv of this.servicios ) {
        if ( srv.TipoServicio.id === 1 && srv.Estado === 'Abierta' ) {
          return true;
        }
      }
    } else {
      let todos = false;
      for ( const srv of this.servicios ) {
        if ( !srv.leido ) {
          todos = true;
        }
      }
      return todos;
    }
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
