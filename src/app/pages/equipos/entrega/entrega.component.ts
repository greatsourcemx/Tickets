import { Component, OnInit } from '@angular/core';
import { GlpiService } from '../../../services/GLPI/glpi.service';
import { GLPIEquipos, GLPIEmpleado, GLPILocacion } from '../../../models/models.index';
import { Responsiva } from '../../../models/responsiva.model';
import { DetalleResponsiva } from '../../../models/detalleResponsiva.model';

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
  responsiva: Responsiva = new Responsiva();
  equipo: GLPIEquipos = new GLPIEquipos();
  pdf: any;
  cargando = false;
  esTelefono = false;
  verPDFViewer = false;
  folio = '';

  constructor(public glpiService: GlpiService) { }

  ngOnInit() {
    this.empresa = 'EBR';
    this.seleccionEmpresa( this.empresa );
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
    .subscribe((data: any) => {
      this.cargando = false;
      this.responsiva.id = 1;
      this.verPDFViewer = true;
      this.pdf = data;
      setTimeout(function() {
        const tabla = document.getElementById('visor');
        tabla.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
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
  }

}
