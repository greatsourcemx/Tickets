import { Component, OnInit } from '@angular/core';
import { GlpiService, ExcelService } from '../../services/service.index';
import { GLPIEmpleado } from '../../models/GLPIEmpleado.model';
import { RetornoEquipo } from '../../models/retorno.model';

@Component({
  selector: 'app-asignado',
  templateUrl: './asignado.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css']

})
export class AsignadoComponent implements OnInit {

  cargando = false;
  empleado: GLPIEmpleado = new GLPIEmpleado();
  equipos: RetornoEquipo[] = [];
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;

  constructor(public glpiServicio: GlpiService,
              public excelService: ExcelService) { }

  ngOnInit() {
    this.cargarEmpleado();
  }

  cargarEmpleado() {
    this.cargando = true;
    this.glpiServicio.cargarEmpleadoGLPI()
    .subscribe((data: GLPIEmpleado) => {
      this.cargando = false;
      this.empleado = data;
      this.cargarEquipo();
    });
  }

  cargarEquipo() {
    this.cargando = true;
    this.glpiServicio.cargarTodoEquipoEmpleado( this.empleado )
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.equipos = data;
      for ( const entr of this.equipos ) {
        entr.empleado = this.empleado;
      }
    });
  }

  sort( property ) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  exportAsXLSX(): void {
    const tabla = document.getElementById('myTable');
    this.excelService.exportTabletoExcel(tabla, 'equipo_Asignado');
  }

}
