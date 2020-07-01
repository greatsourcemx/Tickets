import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService, UsuarioService, ProyectosService } from '../../../services/service.index';
import { Servicio } from '../../../models/servicio.model';
import { Usuario } from '../../../models/usuario.model';
import { Archivos } from '../../../models/archivos.model';
import {Proyecto}  from '../../../models/proyecto.model';
import swal from 'sweetalert2';

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
  ident: number = 0;
  constructor( public activatedRoute: ActivatedRoute,
    public _servicioService: ServiciosService,
    private modalService: NgbModal,
    public _ProyectoService: ProyectosService,
    
    public _usuarioService: UsuarioService,
    public router: Router) {
      activatedRoute.params.subscribe( params => {
        this.usuario = this._usuarioService.usuario;
        let id = params['id'];
        this.ident =id;
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

  reabrir( serv: Servicio ) {
    swal.fire({
      title: '¿Re abrir el Ticket?',
      text: serv.Id + ' ' + serv.Titulo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06d79c',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#398bf7',
    }).then((result) => {
      debugger;
      if (result.value && !this.isAdmin) {
        swal.fire({
          title: "Comentario",
          input: 'text',
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          preConfirm: function (comentario) {
                if (comentario != "") {
                  return new Promise(function (resolve) {
                    resolve([
                      comentario,
                    ])
                  })
                }else{
                  swal.fire(
                    'Alerta',
                    'Debes de escribir un comentario al reabrir :)',
                    'error'
                  )
                }
            },
        }).then((result) => {
          if (result.value != "") {
            serv.Reabrir = result.value[0];
            this.abrirTicket( serv );
          }else{
            swal.fire(
              'Alerta',
              'Debes de escribir un comentario al reabrir :)',
              'error'
            )
          }
        });
      } 
      if (result.value && this.isAdmin){
        this.abrirTicket( serv );

      }
    });
  }

  abrirTicket( serv: Servicio) {
    this._servicioService.abrir( serv )
    .subscribe(() => {
      swal.fire(serv.Id + ' : ' + serv.Titulo, 'Se ha abierto', 'success');
      this.cargarDetalles( this.ident );
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
