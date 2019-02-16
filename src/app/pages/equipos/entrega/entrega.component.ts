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
  cargando = false;

  constructor(public glpiService: GlpiService) { }

  ngOnInit() {
    this.empresa = 'EBR';
    this.seleccionEmpresa( this.empresa );
  }

  seleccionEmpresa ( empresa: string ) {
    this.cargando = true;
    this.empresa = empresa;
    this.glpiService.cargarEntregaGLPI( this.empresa )
    .subscribe((data: any) => {
      this.equipos = data.Equipos;
      this.empleados = data.Empleados;
      this.locacion = data.Locacion;
      this.cargando = false;
    });
  }

  agregarEquipo() {
    if (this.equipo.Id !== 0) {
      this.responsiva.detalle.push( new DetalleResponsiva(0, 3, new Date(), new Date(),
      false, 0, this.responsiva.locacion, this.responsiva.empleado, this.equipo));
    }
  }

  guardar() {
    this.cargando = true;
    this.glpiService.guardarResponsiva( this.responsiva )
    .subscribe((data: Responsiva) => {
      this.cargando = false;
      console.log(data);
    });
  }

}
