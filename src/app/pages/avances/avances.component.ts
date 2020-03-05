import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvancesService, UsuarioService, TiempoService } from '../../services/service.index';
import { Servicio, Usuario, Tiempo, Avances } from '../../models/models.index';
// Drag and Drop
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { Archivos } from '../../models/archivos.model';
import { ServiciosService } from '../../services/servicios/servicios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styles: []
})
export class AvancesComponent implements OnInit {
  /* Drag and Drop */
  public files: NgxFileDropEntry[] = null;
  formData = new FormData();
  cargando = false;
  info = '';
  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  servicio: Servicio = new Servicio();
  usuario: Usuario;
  duracion: Tiempo;
  avance: Avances = new Avances();
  _fecha: any = { year: 1800, month: 1, day: 1 };
  maxdate: Date = new Date();

  constructor(public _avancesService: AvancesService,
    public _servicioService: ServiciosService,
    public activatedRoute: ActivatedRoute,
    public _tiempoService: TiempoService,
    public router: Router,
    public _usuarioService: UsuarioService) {
      activatedRoute.params.subscribe( params => {
        this.usuario = this._usuarioService.usuario;
        let id = params['id'];
        this.cargarAvances( id );
        this.maxdate = new Date();
      });
    }

  ngOnInit() {
    this.cargarTiempos();
    let date = new Date();
    this._fecha.year = date.getFullYear();
    this._fecha.month = date.getMonth() + 1;
    this._fecha.day = date.getDate();
  }

  regresar() {
    let url = localStorage.getItem('url');
    this.router.navigate([url]);
  }

  cargarAvances ( id: number ) {
    this._avancesService.cargarAvances( id )
    .subscribe( (resp: Servicio) => {
      this.servicio = resp;
    });
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
    });
  }

  guardarAvance() {
    if ( this.avance.archivos.length > 0 ) {
      this._servicioService.uploadFile( this.formData )
      .subscribe((data: string[]) => {
        for ( let i = 0; i < data.length; i++ ) {
          this.avance.archivos[i].ruta = data[i];
        }
        this.crearAvance();
      });
    } else {
      this.servicio.archivos = [];
      this.crearAvance();
    }
  }

  crearAvance() {
    // Binding Date
    this.avance.Fecha = new Date(this._fecha.year, this._fecha.month - 1, this._fecha.day);
    this.avance.Responsable = this._usuarioService.usuario;
    this.avance.servId = this.servicio.Id;
    debugger;
    if(this.avance['Duracion'] == undefined){
      swal.fire('Advertencia!', 'Por favor capture Duracion', 'warning');
      return;
    }
    if(this.avance['Comentario'] == undefined || this.avance['Comentario'] == ''){
      swal.fire('Advertencia!', 'Por favor capture Comentario', 'warning');
      return;
    }
    this._avancesService.guardarAvance(this.avance)
    .subscribe( (resp: any) => {
      let url = localStorage.getItem('url');
      this.router.navigate([url]);
    });
  }
  borrar( index: number ) {
    this.cargando = true;
    let values = this.formData.getAll('archivos[]');
    values.splice(index, 1);
    this.avance.archivos.splice(index, 1);
    this.formData.delete('archivos[]');
    values.filter(name => name !== 'Bob')
    .forEach(name => this.formData.append('archivos[]', name));
    this.cargando = false;
  }

  // Drag and Drop
  public dropped(files: NgxFileDropEntry[]) {
    this.cargando = true;
    this.files = files;
    let adjuntos: Archivos[] = [];
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        if ( this.isFileAllowed( droppedFile.relativePath ) ) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const peso = this.transform(file.size);
            if ( this.avance.archivos.length === 5 ) {
              this.cargando = false;
              swal.fire('Advertencia!', 'solo se puede adjuntar como máximo 5 archivos', 'warning');
              return;
            }
            if ( !this.isPesoAllowed(peso) ) {
              this.cargando = false;
              swal.fire('Advertencia!', 'No se permiten archivos con un peso superor a 50 MB', 'warning');
              return;
            }
            // Here you can access the real file
            this.avance.archivos.push( new Archivos( 0, 0, droppedFile.relativePath, '', false, peso ) );
            this.formData.append('archivos[]', file, droppedFile.relativePath);
          });
        } else {
          adjuntos.push( new Archivos( 0, 0, droppedFile.relativePath, ''));
        }
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    if ( adjuntos.length > 0 ) {
      swal.fire('Advertencia!', 'Solo es permitido adjuntar archivos de Office, pdf, imágenes, zip y correos', 'warning');
    }
    if ( this.avance.archivos.length > 0 ) {
      setTimeout(() => {
        this.cargando = false;
      }, 1000 );
    } else {
      this.cargando = false;
    }
  }

  transform(bytes: number = 0, precision: number = 2): string {
    if ( isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
      return '?';
    } else {
      let unit = 0;
      while (bytes >= 1024) {
        bytes /= 1024;
        unit++;
      }
      return bytes.toFixed(+ precision) + ' ' + this.units[unit];
    }
  }

  isPesoAllowed( size: string ): boolean {
    if ( size.indexOf('MB') >= 0 ) {
      const peso: number = Number(size.substr(0, size.indexOf(' ')));
      if (peso > 50) {
        return false;
      }
    }
    return true;
  }

  isFileAllowed( fileName: string ) {
    let isFileAllowed = false;
    const allowedFiles = ['.doc', '.docx', '.dotx', '.xls', '.xlsx', '.zip', '.7z', '.ppt', '.pptx', '.pdf', '.msg'
                          , '.png', '.jpg', '.jpeg', '.gif', '.tiff', '.img', '.bmp', '.txt', '.xml'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName.toLowerCase());
    if (undefined !== extension && null !== extension) {
        for (const ext of allowedFiles) {
            if (ext === extension[0]) {
                isFileAllowed = true;
            }
        }
    }
    return isFileAllowed;
  }

}
