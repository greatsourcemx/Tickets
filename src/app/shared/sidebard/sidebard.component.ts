import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: []
})
export class SidebardComponent implements OnInit {

  constructor( public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

}
