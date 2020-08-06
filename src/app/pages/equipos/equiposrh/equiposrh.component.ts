import { Component, OnInit } from '@angular/core';
import { GlpiService, ExcelService, AccesoService } from '../../../services/service.index';
import { GLPIEmpleado, Accesos } from '../../../models/models.index';
import { RetornoEquipo } from '../../../models/retorno.model';

@Component({
  selector: 'app-equiposrh',
  templateUrl: './equiposrh.component.html',
  styles: [],
  styleUrls: ['../../agenda/agenda.component.css']

})
export class EqiposRHComponent implements OnInit {

  empleados: GLPIEmpleado[] = [];
  empleado: GLPIEmpleado = new GLPIEmpleado();
  acceso: Accesos = new Accesos();
  equipos: RetornoEquipo[] = [];
  pdf: any;
  equipo = '';
  cargando = false;
  msg = false;
  verRetorno = false;
  retorTodos = false;
  verPDFViewer = false;
  usuarioon: string ="";

  constructor(public glpiService: GlpiService,
              public excelService: ExcelService,
              public accesosService: AccesoService,
              ) { }

  ngOnInit() { 
    debugger;

    this.cargauser();

    
  }
  cargauser(){
    this.accesosService.cargaUsuario()
    .subscribe((data: Accesos) => {
      this.cargando = false;
      this.acceso = data;
      if (this.acceso.IMA == true || this.acceso.EBR == true){
        this.cargarEmpleados();
      }
    });
  }
  cargarEmpleados() {
    debugger;
    var usuario="";
    try {usuario= JSON.parse(localStorage.usuario)} catch{}
    JSON.parse(localStorage.usuario)
    this.cargando = true;
    this.glpiService.cargarTodosEmpleadosrh(usuario['usuario'])
    .subscribe((data: any) => {
       
      this.cargando = false;
      this.empleados = data;
    });
  }

  buscaEquipo() {
    this.cargando = true;
    this.verPDFViewer = false;
    this.glpiService.buscaEquipo( this.equipo )
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.equipos = data;
    });
  }
  buscarEquipoEmpleado() {
    this.cargando = true;
    this.verPDFViewer = false;
    this.glpiService.cargarTodoEquipoEmpleadorh( this.empleado )
    .subscribe((data: RetornoEquipo[]) => {
      this.cargando = false;
      this.msg = true;
      this.equipos = data;
      for ( const entr of this.equipos ) {
        entr.empleado = this.empleado;
      }
    });
  }

  limpiar() {
    this.empleado = new GLPIEmpleado();
    this.equipos = [];
    this.pdf = null;
    this.equipo = '';
    this.cargando = false;
    this.msg = false;
    this.verRetorno = false;
    this.retorTodos = false;
    this.verPDFViewer = false;
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
    this.verPDFViewer = false;
    this.glpiService.verPDFFolio( folio, empr )
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

}
