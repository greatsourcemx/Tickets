import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiciosService, UsuarioService, PrioridadService } from '../../services/service.index';
import { Servicio, Usuario, Prioridad } from '../../models/models.index';
// Drag and Drop
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
// Copy
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import swal from 'sweetalert';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(window:paste)' : 'handlePaste( $event )'
  },
  styles: []
})
export class NuevoServicioComponent implements OnInit {

  public files: NgxFileDropEntry[] = null;
  formData = new FormData();
  // Copy
  public imageUrls: SafeUrl[];
  private lastObjectUrl: string;
  private sanitizer: DomSanitizer;

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

  guardarServicio( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.files !== null ) {
      this._servicioService.uploadFile( this.formData )
      .subscribe((data: string) => {
        this.servicio.archivo = data;
        this.crearTicket();
      });
    } else {
      this.servicio.archivo = '';
      this.servicio.archivoOriginal = '';
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

  // Drag and Drop
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          this.formData = new FormData();
          this.formData.append('', file, droppedFile.relativePath);
          this.servicio.archivoOriginal = droppedFile.relativePath;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event) {
    // console.log(event);
  }
  public fileLeave(event) {
    // console.log(event);
  }

  // Handle Paste

    // ---
    // PUBLIC METHODS.
    // ---

    // I handle the paste event on the Window (see host bindings).
    public handlePaste( event: ClipboardEvent ): void {

      const pastedImage = this.getPastedImage( event );

      if ( ! pastedImage ) {
          return;
      }

      // When we create Object URLs, the browser will keep them in memory until the
      // document is unloaded or until the URL is explicitly released. Since we are
      // going to create a new URL every time the user pastes an image into the app (in
      // this particular demo), we need to be sure to release the previous Object URL
      // before we create the new one.
      // --
      // NOTE: One the Image is rendered in the DOM, releasing the Object URL will not
      // affect the rendering.
      if ( this.lastObjectUrl ) {
          URL.revokeObjectURL( this.lastObjectUrl );
      }

      // At this point, the "pastedImage" is a File object, which is a specialized type
      // of "Blob". We can now generate a "blob:" URL using the given File.
      this.lastObjectUrl = URL.createObjectURL( pastedImage );

      // By default, Angular WILL NOT TRUST this "blob:" style URLs. However, since we
      // know these are going to be expected, we can use the DOM Sanitizer to bypass
      // the security checks on these images.
      // --
      // NOTE: The sanitizer doesn't return Strings - it returns SafeUrls.
      this.imageUrls.unshift(
          this.sanitizer.bypassSecurityTrustUrl( this.lastObjectUrl )
      );

  }

  // ---
    // PRIVATE METHODS.
    // ---

    // I return the first Image File from the given paste event (or null).
    private getPastedImage( event: ClipboardEvent ): File | null {

      // NOTE: I am not very familiar with the Paste Event. As such, I am probably
      // being more cautious here than I need to be. However, in an abundance of
      // caution, I am checking each part of the targeted object path.
      if (
          event.clipboardData &&
          event.clipboardData.files &&
          event.clipboardData.files.length &&
          this.isImageFile( event.clipboardData.files[ 0 ] )
          ) {

          return( event.clipboardData.files[ 0 ] );

      }
      return( null );
  }
  // I determine if the given File is an Image (according do its Mime-Type).
  private isImageFile( file: File ): boolean {
      return( file.type.search( /^image\//i ) === 0 );
  }
}
