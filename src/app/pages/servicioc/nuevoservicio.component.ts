import { Component, OnInit } from '@angular/core';
import { Archivos } from '../../models/archivos.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { RecurrentesService, 
    SolicitanteService, 
    UsuarioService, 
    TiposService,
    ServiciosService,
     ServicioCatalogoService } from '../../services/service.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import Json from '../../../assets/json/mimesTypes.json';

import { Usuario, Tipo, Archivoscatalogo } from '../../models/models.index';
import { ServicioCatalogo } from '../../models/serviciocatalogo.model';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop/ngx-file-drop/dom.types'; 
import * as dias from '../../config/dias.json';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoservicio',
  templateUrl: './nuevoservicio.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css', '../principal/iconos.component.css', './nuevoservicio.component.css']

})
export class NuevoServiciocComponent implements OnInit {
  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  public files: NgxFileDropEntry[] = null;

  solicitantes: Usuario[] = [];
  responsables: Usuario[] = [];
  selId: number;

  formData = new FormData();
  tipos: Tipo[] = []; 
  archivosnuevos: Archivoscatalogo[] = []; 
  edita: string = "0"; 
  dias: any[] = dias.default;
  fecha: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  fechaFin: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1 };
  minfecha: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  cargando = false;
   public servcat: ServicioCatalogo = new ServicioCatalogo(0,'','','','','','','','',0,0,   this.minfecha,  this.minfecha, this.fecha);


  constructor(public recuService: RecurrentesService,
              public usuarioService: UsuarioService,
              public soliService: SolicitanteService,
              public tipoServ: TiposService,
              public _servicioService: ServiciosService,
              private modalService: NgbModal,
              public activatedRoute: ActivatedRoute,
              public serviciocatalogo_: ServicioCatalogoService,
              public router: Router) { 
                activatedRoute.params.subscribe( params => {
                  let id = params['id'];
                    if (id) {
                        this.edita ="1";
                        this.serviciocatalogo_.consultaServicioid(id)
                        .subscribe( (resp: any) => {
                            this.cargando = false;
                            this.servcat = resp; 
                            if(this.servcat.TelefonoProve.length == 10){
                            this.servcat.TelefonoProve = this.servcat.TelefonoProve.substr(0,3) + '-'
                             + this.servcat.TelefonoProve.substr(3,3) + '-' 
                             +this.servcat.TelefonoProve.substr(6,2) + '-' +
                             this.servcat.TelefonoProve.substr(8,2)
                            }
                            let _fecfin: Date = new Date(this.servcat.FechaVencimiento);
                            let _fec: Date = new Date(this.servcat.FechaCreado);
                            this.fecha = { year: _fec.getFullYear(),
                                month: _fec.getMonth() + 1,
                                day: _fec.getDate() };
                            this.fechaFin = { year: _fecfin.getFullYear(),
                                  month: _fecfin.getMonth() + 1,
                                  day: _fecfin.getDate() };
                             
                            }); 
                      }else{
                        this.servcat.Estatus=1
                      }
                  });
                }

  ngOnInit() {
    //this.cargarSolicitante();
  }
 
  public changeact(value){
      debugger;
    if(value.target.checked){
        this.servcat.Estatus=1
    }else{
        this.servcat.Estatus=0
    } 
}
  selDia( event: any, dia: any ) {
    dia.seleccionado = event.currentTarget.checked;
  }
  guardar(){
    if(this.edita == "1"){
      
      if ( this.servcat.archivos.length > 0 ) {
        for(let i = 0; i < this.servcat.archivos.length; i++){ 
            if(this.servcat.archivos[i].newfile == 1){
                console.log(this.servcat.archivos[i])
                this.archivosnuevos.push(this.servcat.archivos[i]);
            }
        }
        this.servcat.archivos = this.archivosnuevos;
        if(this.archivosnuevos.length == 0){
          this.editaServicio();
        }
        this._servicioService.uploadFile( this.formData )
        .subscribe((data: string[]) => {
          for ( let i = 0; i < data.length; i++ ) {
            this.servcat.archivos[i].ArchRuta = data[i];
          }
          this.editaServicio();
        });
      }else{
        this.editaServicio();
      }
        
    }else{
      
      if ( this.servcat.archivos.length > 0 ) {
        this._servicioService.uploadFile( this.formData )
        .subscribe((data: string[]) => {
          for ( let i = 0; i < data.length; i++ ) {
            this.servcat.archivos[i].ArchRuta = data[i];
          } 
          this.guardarServicio();
        });
      } else {
        
        this.servcat.archivos = []; 
        this.guardarServicio();
      }
    }
  }
  open( content, arc: Archivoscatalogo) { 
    this.selId = arc.id; 
    if ( arc.esImagen ) {
      this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    } else {
      this.download( arc );
    }
  }
  download( archi: Archivoscatalogo ) {
    this.serviciocatalogo_.downloadFile( archi.id )
    .subscribe(x => {
      // get mimeType
      const _extension = archi.ArchNombre.substr( archi.ArchNombre.indexOf('.'));
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
      link.download = archi.ArchNombre;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(downloadURL);
          link.remove();
      }, 100);
    });
  }
  guardarServicio() {
      debugger;
    if (!this.validaciones()) {
      return;
    }
    
    this.servcat.FechaCreado = new Date(this.fecha.year, this.fecha.month - 1, this.fecha.day);
    if (this.servcat.FechaVencimiento) {
      this.servcat.FechaVencimiento = new Date(this.fechaFin.year, this.fechaFin.month - 1, this.fechaFin.day);
    } else {
      this.servcat.FechaVencimiento = new Date(1800, 1, 1);
    }
    this.cargando = true;
    this.servcat.Fecha = null;
    var element = <HTMLInputElement> document.getElementById("botonG");
    element.disabled = true;
    this.serviciocatalogo_.crearServicio( this.servcat )
    .subscribe((data: ServicioCatalogo) => {
      this.cargando = false; 
      swal.fire('Correcto', 'Se guardo el servicio', 'success');
      this.router.navigate(['/servicioc']);
    });
  }
  editaServicio() {
    debugger;
  if (!this.validaciones()) {
    return;
  } 
  this.servcat.TelefonoProve = this.servcat.TelefonoProve.replace('-',''); 
  this.servcat.TelefonoProve = this.servcat.TelefonoProve.replace('-',''); 
  this.servcat.TelefonoProve = this.servcat.TelefonoProve.replace('-',''); 

  this.servcat.FechaCreado = new Date(this.fecha.year, this.fecha.month - 1, this.fecha.day);
  if (this.servcat.FechaVencimiento) {
    this.servcat.FechaVencimiento = new Date(this.fechaFin.year, this.fechaFin.month - 1, this.fechaFin.day);
  } else {
    this.servcat.FechaVencimiento = new Date(1800, 1, 1);
  }
  this.cargando = true;
  var element = <HTMLInputElement> document.getElementById("botonG");
  element.disabled = true; 
   this.serviciocatalogo_.actualizaServicio( this.servcat )
  .subscribe((data: ServicioCatalogo) => {
    this.cargando = false; 
    swal.fire('Correcto', 'Se guardo el servicio', 'success');
    this.router.navigate(['/servicioc']);
  });
}
borrar( index: number, archivo ) {
    this.cargando = true;
    let values = this.formData.getAll('archivos[]');
    values.splice(index, 1);
    this.servcat.archivos.splice(index, 1);
    this.formData.delete('archivos[]');
    values.filter(name => name !== 'Bob')
    .forEach(name => this.formData.append('archivos[]', name));
    this.cargando = false;
    this.serviciocatalogo_.borraServicio( archivo.id )
    .subscribe((data) => {
      this.cargando = false; 
     });
  }
  validaciones(): boolean {
    /*if ( this.recurrente.solicitante.id === 0 ) {
      swal.fire('Advertencia', 'Debe seleccionar el solicitante', 'warning');
      return false;
    }
    if ( this.recurrente.solicitante.id === 0 ) {
      swal.fire('Advertencia', 'Debe seleccionar el responsable', 'warning');
      return false;
    }*/
    return true;
  }
  isFileAllowed( fileName: string ) {
    let isFileAllowed = false;
    const allowedFiles = ['.pdf', '.png', '.jpg', '.jpeg', '.tiff', '.img'];
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
  isPesoAllowed( size: string ): boolean {
    if ( size.indexOf('MB') >= 0 ) {
      const peso: number = Number(size.substr(0, size.indexOf(' ')));
      if (peso > 50) {
        return false;
      }
    }
    return true;
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
  public dropped(files: NgxFileDropEntry[]) {
    this.cargando = true;
    this.files = files;
    let adjuntos: Archivoscatalogo[] = [];
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        if ( this.isFileAllowed( droppedFile.relativePath ) ) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const peso = this.transform(file.size);
            if ( this.servcat.archivos.length === 5 ) {
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
            this.servcat.archivos.push( new Archivoscatalogo( 0, 0, '', droppedFile.relativePath, false, peso, 1 ) );
            this.formData.append('archivos[]', file, droppedFile.relativePath);
          });
        } else {
          adjuntos.push( new Archivoscatalogo( 0, 0 , '', droppedFile.relativePath));
        }
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    if ( adjuntos.length > 0 ) {
      swal.fire('Advertencia!', 'Solo es permitido adjuntar archivos pdf e imágenes', 'warning');
    }
    if ( this.servcat.archivos.length > 0 ) {
      setTimeout(() => {
        this.cargando = false;
      }, 1000 );
    } else {
      this.cargando = false;
    }
  }
}
