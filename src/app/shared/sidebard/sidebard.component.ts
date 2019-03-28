import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: []
})
export class SidebardComponent implements OnInit {

  menu: any = [];
  usuario: Usuario;

  constructor( public _sidebar: SidebarService,
    public router: Router,
    public _usuarioService: UsuarioService ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      if ( this.usuario.root === 'principal' ) {
        this.menu = this._sidebar.cargarMenus(true);
      } else {
        this.menu = this._sidebar.cargarMenus(false);
      }
  }

  ngOnInit() {
  }

}
