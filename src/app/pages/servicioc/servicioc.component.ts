import { Component, HostListener, OnInit } from '@angular/core';
import { MantenimientoService, ProyectosService, ServicioCatalogoService } from '../../services/service.index';
import { Proyecto } from '../../models/proyecto.model';
import { Version } from '../../models/versiones.model';
import { ServicioCatalogo } from '../../models/serviciocatalogo.model';
import {Archivoscatalogo } from '../../models/models.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import Json from '../../../assets/json/mimesTypes.json';


import swal from 'sweetalert2';
@Component({
  selector: 'app-servicioc',
  templateUrl: './servicioc.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css', '../principal/iconos.component.css', './servicioc.component.css']
})

export class ServiciocComponent implements OnInit {
    cargando: boolean = false;
    servicios: ServicioCatalogo[] = null;
    isDesc: boolean = false;
    column: string = 'CategoryName';
    direction: number;

    query = '';
    selId: number;
    public servcat: Archivoscatalogo[] = null;
    visible: string = 'setunv';


    public checkTarea:boolean;


    constructor(public _manteServices: MantenimientoService,
      public _ProyectoService: ProyectosService,
      private modalService: NgbModal,  
      public _ServicioCatalogo: ServicioCatalogoService
      ) {

    }

    ngOnInit() {
        this.cargarservicios();
        $('#checkactivos').prop('checked', true);
        this.checkTarea = true;
    }
    sort(property) {
      this.isDesc = !this.isDesc; // change the direction
      this.column = property;
      this.direction = this.isDesc ? 1 : -1;
    }
    changeCheck(valor){ 
        this.checkTarea = valor.target.checked;
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
        this._ServicioCatalogo.downloadFile( archi.id )
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
    openModal( content, arc){
      this.servcat = arc;
      this.visible = "setv"; 
    }
    nada(){
        alert("hola")
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      var modal = document.getElementById("myModal"); 
      if (event.target == modal) {
        this.visible = "setunv";
      } 
      }
    CloseModal(){
      this.visible = "setunv";
      
    }
    restarFechas(fecha){ 
      var date_1 = new Date(fecha.split('T')[0]);
      var date_2 = new Date(new Date().toJSON().split('T')[0]);
      var day_as_milliseconds = 86400000;
      var diff_in_millisenconds = Number(date_1) - Number(date_2);
      var diff_in_days = diff_in_millisenconds / day_as_milliseconds;
      return diff_in_days;
    }
    fechaMes(fecha){
      var fechaux = fecha.split('-')
      var mes='';
      if(fechaux[1] == '01'){ mes = "Ene"}
      if(fechaux[1] == '02'){ mes = "Feb"}
      if(fechaux[1] == '03'){ mes = "Mar"}
      if(fechaux[1] == '04'){ mes = "Abr"}
      if(fechaux[1] == '05'){ mes = "May"}
      if(fechaux[1] == '06'){ mes = "Jun"}
      if(fechaux[1] == '07'){ mes = "Jul"}
      if(fechaux[1] == '08'){ mes = "Ago"}
      if(fechaux[1] == '09'){ mes = "Sep"}
      if(fechaux[1] == '10'){ mes = "Oct"}
      if(fechaux[1] == '11'){ mes = "Nov"}
      if(fechaux[1] == '12'){ mes = "Dic"}


      return fechaux[2]+'-'+mes+'-'+fechaux[0];
    }
    cargarservicios () {
        debugger;
        this.cargando = true;
        this._ServicioCatalogo.cargarServicios()
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.servicios = resp;
        });
    }
}
