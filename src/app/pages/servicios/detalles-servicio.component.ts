import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-detalles-servicio',
  templateUrl: './detalles-servicio.component.html',
  styles: []
})
export class DetallesServicioComponent implements OnInit {

  servicio: Servicio = new Servicio('');
  usuario: Usuario;

  constructor( public activatedRoute: ActivatedRoute,
    public _servicioService: ServiciosService,
    public _usuarioService: UsuarioService,
    public router: Router) {
      activatedRoute.params.subscribe( params => {
        this.usuario = this._usuarioService.usuario;
        let id = params['id'];
        this.cargarDetalles( id );
      });
    }

  ngOnInit() {
  }

  cargarDetalles ( id: number ) {
    this._servicioService.cargarDetalles( this.usuario.id, id )
    .subscribe( (resp: Servicio) => {
      this.servicio = resp;
      console.log(this.servicio);
    });
  }

}
