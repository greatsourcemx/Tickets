import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService, UsuarioService, ProyectosService } from '../../../services/service.index';
import { Servicio } from '../../../models/servicio.model';
import { Usuario } from '../../../models/usuario.model';
import { Archivos } from '../../../models/archivos.model';
import {Proyecto}  from '../../../models/proyecto.model';

@Component({
  selector: 'app-detallepro',
  templateUrl: './detallepro.component.html',
  styles: [],
  styleUrls: ['../../agenda/agenda.component.css', '../../principal/iconos.component.css'],

})
export class DetallesProyecto implements OnInit {

  proyecto: Proyecto = new Proyecto('');
  usuario: Usuario;
  selId: number;
  isAdmin = false;

  constructor( public activatedRoute: ActivatedRoute,
    public _servicioService: ServiciosService,
    private modalService: NgbModal,
    public _ProyectoService: ProyectosService,
    
    public _usuarioService: UsuarioService,
    public router: Router) {
      activatedRoute.params.subscribe( params => {
        this.usuario = this._usuarioService.usuario;
        let id = params['id'];
        this.cargarDetalles( id );
      });
    }

  ngOnInit() {
    this._usuarioService.esAdmin()
    .subscribe((data: boolean) => {
      this.isAdmin = data;
    });
  }

  cargarDetalles ( id: number ) {
    this._ProyectoService.cargarDesarrollo( id )
    .subscribe( (resp: Proyecto) => {
      debugger;
      this.proyecto = resp;
    });
  }

  



  regresar() {
    let url = localStorage.getItem('url');
    if ( url === '/' && !this.isAdmin ) {
      this.router.navigate(['dashboard']);
      return;
    }
    this.router.navigate([url]);
  }

}
