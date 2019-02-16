import { Component, OnInit } from '@angular/core';
import { UsuarioService, ServiciosService } from '../../services/service.index';
import { Usuario, Principal } from '../../models/models.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  principal: Principal = new Principal();

  constructor(
    public _usuarioService: UsuarioService,
    public _servicioService: ServiciosService ) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
    this.cargarInfo();
  }

  cargarInfo () {
    // this._servicioService.cargarInfoPrincipal( this.usuario.id, this.usuario.rol )
    // .subscribe((resp: any) => {
    //   this.principal = resp;
    // });
  }

}
