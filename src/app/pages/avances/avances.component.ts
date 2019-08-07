import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvancesService, UsuarioService, TiempoService } from '../../services/service.index';
import { Servicio, Usuario, Tiempo, Avances } from '../../models/models.index';
// Drag and Drop
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { Archivos } from '../../models/archivos.model';
import { ServiciosService } from '../../services/servicios/servicios.service';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styles: []
})
export class AvancesComponent implements OnInit {
  /* Drag and Drop */
  public files: NgxFileDropEntry[] = null;
  formData = new FormData();
  adjuntos: any = [];
  cargando = false;
  info = '';

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
    let i = 0;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          this.avance.archivos.push( new Archivos( 0, 0, droppedFile.relativePath, '' ) );
          this.formData.append('archivos[]', file, droppedFile.relativePath);
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

}
