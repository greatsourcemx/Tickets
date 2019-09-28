import { Component, OnInit } from '@angular/core';
import { GlpiService, ExcelService } from '../../../services/service.index';
import { GLPIEmpleado } from '../../../models/models.index';
import { RetornoEquipo } from '../../../models/retorno.model';


@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styles: []
})
export class SalidaComponent implements OnInit {

  empleados: GLPIEmpleado[] = [];
  empleado: GLPIEmpleado = new GLPIEmpleado();
  equipos: RetornoEquipo[] = [];
  equipo = '';
  cargando = false;
  msg = false;
  verRetorno = false;
  retorTodos = false;

  constructor(public glpiService: GlpiService,
              public excelService: ExcelService) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.cargando = true;
    this.glpiService.cargarTodosEmpleados()
    .subscribe((data: any) => {
      this.cargando = false;
      this.empleados = data;
    });
  }
  buscaEquipo() {
    this.cargando = true;
    this.glpiService.buscaEquipo( this.equipo )
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.equipos = data;
    });
  }
  buscarEquipoEmpleado() {
    this.cargando = true;
    this.glpiService.cargarTodoEquipoEmpleado( this.empleado )
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.msg = true;
      this.equipos = data;
      for ( const entr of this.equipos ) {
        entr.empleado = this.empleado;
      }
    });
  }

  retornar() {
    this.cargando = true;
    this.glpiService.retornarEquipo( this.equipos, '')
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.retorTodos = false;
      this.equipos = data;
    });
  }

  verBotones() {
    this.verRetorno = false;
    for ( const entr of this.equipos ) {
      if ( entr.retornar ) {
        this.verRetorno = true;
      }
    }
  }

  RetorTodos() {
    for ( const entr of this.equipos ) {
      entr.retornar = this.retorTodos;
    }
    this.verBotones();
  }

  exportAsXLSX(): void {
    const tabla = document.getElementById('myTable');
    this.excelService.exportTabletoExcel(tabla, 'equipo_Asignado');
  }

  verPDF( folio: number, empr: string ) {
    this.cargando = true;
    this.glpiService.verPDFFolio( folio, empr )
    .subscribe((data: any) => {
      this.cargando = false;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

}
