import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService, UsuarioService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.model';
import { Usuario } from '../../models/usuario.model';
import { Archivos } from '../../models/archivos.model';
import Json from '../../../assets/json/mimesTypes.json';

@Component({
  selector: 'app-detalles-servicio',
  templateUrl: './detalles-servicio.component.html',
  styles: []
})
export class DetallesServicioComponent implements OnInit {

  servicio: Servicio = new Servicio('');
  usuario: Usuario;
  selId: number;
  isAdmin = false;

  constructor( public activatedRoute: ActivatedRoute,
    public _servicioService: ServiciosService,
    private modalService: NgbModal,
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
    this._servicioService.cargarDetalles( id )
    .subscribe( (resp: Servicio) => {
      this.servicio = resp;
      console.log(this.servicio);
    });
  }

  open( content, arc: Archivos) {
    this.selId = arc.id;
    if ( arc.esImagen ) {
      this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    } else {
      this.download( arc );
    }
  }

  download( archi: Archivos ) {
    this._servicioService.downloadFile( archi.id )
    .subscribe(x => {
      // get mimeType
      const _extension = archi.nombre.substr( archi.nombre.indexOf('.'));
      const _mimeType = Json.Types[_extension];
      // manejo Blob
      const newBlob = new Blob([x], { type: _mimeType });
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const downloadURL = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = archi.nombre;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(downloadURL);
          link.remove();
      }, 100);
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
