import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { GlpiService } from '../../../services/GLPI/glpi.service';
import { TiempoService } from '../../../services/service.index';
import { GLPIEquipos, GLPIEmpleado, GLPILocacion, Tiempo } from '../../../models/models.index';
import { Responsiva } from '../../../models/responsiva.model';
import { DetalleResponsiva } from '../../../models/detalleResponsiva.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styles: []
})
export class EntregaComponent implements OnInit {

  empresa: string;
  equipos: GLPIEquipos[] = [];
  empleados: GLPIEmpleado[] = [];
  locacion: GLPILocacion[] = [];
  duracion: Tiempo[] = [];
  responsiva: Responsiva = new Responsiva();
  equipo: GLPIEquipos = new GLPIEquipos();
  pdf: any;
  cargando = false;
  esTelefono = false;
  verPDFViewer = false;
  folio = '';
  msgMante: string[] = null;


  constructor(public glpiService: GlpiService,
              public _tiempoService: TiempoService) { }

  ngOnInit() {
    this.empresa = 'EBR';
    this.seleccionEmpresa( this.empresa );
    this.cargarTiempos();
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
    });
  }

  seleccionEmpresa ( empresa: string ) {
    this.cargando = true;
    this.empresa = empresa;
    this.verPDFViewer = false;
    this.pdf = null;
    this.glpiService.cargarEntregaGLPI( this.empresa )
    .subscribe((data: any) => {
      this.equipos = data.Equipos;
      this.empleados = data.Empleados;
      this.locacion = data.Locacion;
      this.cargando = false;
      this.responsiva = new Responsiva();
      this.equipo = new GLPIEquipos();
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.cargando = true;
      this.responsiva = new Responsiva();
      this.equipo = new GLPIEquipos();
      this.glpiService.cargarResponsiva( this.folio, this.empresa)
      .subscribe((data: Responsiva) => {
        this.cargando = false;
        this.responsiva = data;
      });
    }
  }

  agregarEquipo() {
    if (this.equipo.Id !== 0) {
      if (!this.responsiva.detalle.some((item) => item.equipo.Id === this.equipo.Id)) {
        this.equipo.duracion = this.duracion[0];
        this.responsiva.detalle.push( new DetalleResponsiva(0, 3, new Date(), new Date(),
        false, 0, this.responsiva.locacion, this.responsiva.empleado, this.equipo));
        this.esTelefono = this.equipo.Tipo === 'Phone' ? true : false;
      }
    }
  }

  removerEquipo( index: number ) {
    this.verPDFViewer = false;
    this.responsiva.detalle.splice( index, 1 );
    if (this.esTelefono) {
      this.esTelefono = false;
    }
  }

  guardar() {
    this.cargando = true;
    this.verPDFViewer = false;
    this.responsiva.empresa = this.empresa;
    this.glpiService.guardarResponsiva( this.responsiva )
    .subscribe((data: HttpResponse<Blob>) => {
      this.cargando = false;
      const msg = data.headers.get('content-disposition');
      this.mensajeMante(msg.substr(21));
      this.responsiva.id = 1;
      this.verPDFViewer = true;
      this.pdf = data.body;
      setTimeout(function() {
        const tabla = document.getElementById('visor');
        tabla.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  mensajeMante( msg: string ) {
    this.msgMante = [];
    let split = msg.split('|');
    for (let i = 0; i < split.length; i++) {
      if (split[i] !== '') {
        this.msgMante.push( split[i] );
      }
    }
    if ( this.msgMante.length <= 0 ) {
      this.msgMante = null;
    } else {
      Swal.fire('No se generó el mantenimiento de algún equipo');
    }
  }

  verPDF() {
    this.cargando = true;
    this.verPDFViewer = false;
    this.responsiva.empresa = this.empresa;
    this.glpiService.verPDF( this.responsiva )
      .subscribe((data: any) => {
        this.cargando = false;
        this.verPDFViewer = true;
        this.pdf = data;
        setTimeout(function() {
          const tabla = document.getElementById('visor');
          tabla.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
  }

  nuevo() {
    this.responsiva = new Responsiva();
    this.equipo = new GLPIEquipos();
    this.cargando = false;
    this.verPDFViewer = false;
    this.folio = '';
    this.pdf = null;
    this.msgMante = null;
  }

}
