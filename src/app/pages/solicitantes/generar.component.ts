import { Component, OnInit } from '@angular/core';
import { GlpiService } from '../../services/GLPI/glpi.service';
import { GLPIEmpleado } from '../../models/GLPIEmpleado.model';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styles: []
})
export class GenerarComponent implements OnInit {

  empleados: GLPIEmpleado[] = [];
  query = '';
  empresa = 'EBR';
  cargando = false;

  constructor(public glpiServicio: GlpiService) { }

  ngOnInit() {
    this.cargarSolicitantesNuevos();
  }

  seleccionEmpresa( empr: string ) {
    this.empresa = empr;
    this.cargarSolicitantesNuevos();
  }

  cargarSolicitantesNuevos() {
    this.cargando = true;
    this.glpiServicio.cargarNuevosSolicitantes( this.empresa )
    .subscribe((data: GLPIEmpleado[]) => {
      this.cargando = false;
      this.empleados = data;
    });
  }

  crearSolicitante( empleado: GLPIEmpleado ) {
    this.cargando = true;
    this.glpiServicio.generarSolicitante( this.empresa, empleado )
    .subscribe(() => { this.cargarSolicitantesNuevos(); });
  }

}
