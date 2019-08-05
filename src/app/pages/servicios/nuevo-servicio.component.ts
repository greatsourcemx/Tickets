import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiciosService, UsuarioService, PrioridadService } from '../../services/service.index';
import { Servicio, Usuario, Prioridad } from '../../models/models.index';
import swal from 'sweetalert';
// Drag and Drop
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { Archivos } from '../../models/archivos.model';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styles: []
})
export class NuevoServicioComponent implements OnInit {

  public files: NgxFileDropEntry[] = null;
  formData = new FormData();
  adjuntos: any = [];
  cargando = false;
  info = '';

  servicio: Servicio = new Servicio('', '');
  usuario: Usuario;
  prioridades: Prioridad[] = [];
  nuevo: boolean = true;
  fecha = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  fecCompr: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  constructor(public _servicioService: ServiciosService,
              public _usuarioService: UsuarioService,
              public _prioridadService: PrioridadService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarPrioridades();
  }

  cargarPrioridades () {
    this._prioridadService.cargarActivos()
      .subscribe( (resp: any) => {
        this.prioridades = resp;
      });
  }

  cambio() {
    this.info = '';
    const sel = this.prioridades.filter( p => p.Id === this.servicio.Urgencia.Id );
    this.info = sel[0].Descripcion;
  }

  guardarServicio( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.servicio.archivos.length > 0 ) {
      this._servicioService.uploadFile( this.formData )
      .subscribe((data: string[]) => {
        // this.servicio.archivos = data;
        for ( let i = 0; i < data.length; i++ ) {
          this.servicio.archivos[i].ruta = data[i];
        }
        this.crearTicket();
      });
    } else {
      this.servicio.archivos = [];
      this.crearTicket();
    }
  }

  crearTicket() {
    this.servicio.FecCompromiso = new Date(this.fecCompr.year, this.fecCompr.month - 1, this.fecCompr.day);
    this._servicioService.guardarServicio(this.usuario.id, this.servicio )
    .subscribe( usuario => {
      swal('Servicio Creado', this.servicio.Titulo, 'success' );
      this.nuevo = false;
    },
    error => {
      swal('Aviso!', error.error, 'warning');
    });
  }

  borrar( index: number ) {
    this.cargando = true;
    let values = this.formData.getAll('archivos[]');
    values.splice(index, 1);
    this.servicio.archivos.splice(index, 1);
    this.formData.delete('archivos[]');
    values.filter(name => name !== 'Bob')
    .forEach(name => this.formData.append('archivos[]', name));
    this.cargando = false;
  }

  // Drag and Drop
  public dropped(files: NgxFileDropEntry[]) {
    this.cargando = true;
    this.files = files;
    let i = 0;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          this.servicio.archivos.push( new Archivos( 0, 0, droppedFile.relativePath, '' ) );
          this.formData.append('archivos[]', file, droppedFile.relativePath);
          // this.servicio.archivoOriginal = droppedFile.relativePath;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    setTimeout(() => {
      this.cargando = false;
    }, 1000 );
  }
  public fileOver(event) {
    // console.log(event);
  }
  public fileLeave(event) {
    // console.log(event);
  }
}
