import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService, UsuarioService, AccesoService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import {  Accesos } from '../../models/models.index';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: [],
  styleUrls: ['./sidebar.component.css']

})
export class SidebardComponent implements OnInit {
  acceso: Accesos = new Accesos();

  menu: any = [];
  usuario: Usuario;
  userrh: string = "";
  constructor( public _sidebar: SidebarService,
    public router: Router,
    public _usuarioService: UsuarioService,
    public accesosService: AccesoService,
     ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      if ( this.usuario.root === 'principal' ) {
        this.menu = this._sidebar.cargarMenus(true);
      } else {
        this.menu = this._sidebar.cargarMenus(false);
      }
  }

  ngOnInit() {
    this.cargauser();
    var jsou = JSON.parse(localStorage.usuario);
    try{this.userrh = jsou.usuario;} catch{}
    
  }
  cargauser(){ 
    debugger;
    this.accesosService.cargaUsuario()
    .subscribe((data: Accesos) => { 
      this.acceso = data; 
    });
  }
}
