import { Component, OnInit } from '@angular/core';
import { GlpiService, ExcelService, AccesoService } from '../../services/service.index';
import { GLPIEmpleado, Accesos } from '../../models/models.index';
import { RetornoEquipo,  } from '../../models/retorno.model';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-salida',
  templateUrl: './accescon.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css']

})
export class AccesConComponent implements OnInit {

  empleados: GLPIEmpleado[] = [];
  empleado: GLPIEmpleado = new GLPIEmpleado();
  equipos: RetornoEquipo[] = [];
  accesos: Accesos[] = [];
  acces: Accesos = new Accesos();


  pdf: any;
  equipo = '';
  cargando = false;
  msg = false;
  verRetorno = false;
  retorTodos = false;
  verPDFViewer = false;

  constructor(public glpiService: GlpiService,
              public excelService: ExcelService,
              public accesosService: AccesoService,
              ) { }

  ngOnInit() {
    this.cargarEmpleados();
    this.cargarAccesos();
  }

  cargarEmpleados() { 
    this.cargando = true;
    this.glpiService.cargarTodosEmpleados()
    .subscribe((data: any) => {
       
      this.cargando = false;
      this.empleados = data;
    });
  }
  cargarAccesos(){
    this.cargando = true;
    this.accesosService.cargarAll()
    .subscribe((data: any) => {
      this.cargando = false;
      this.accesos = data;
    });
  }
  AgregarEmpleado() {
    debugger; 
    var aux=0;
    let usuario:  Usuario = new Usuario('', '');
    usuario.nombre= this.empleado.Nombre;
    usuario.correo= this.empleado.Correo;
    usuario.noEmpleado= this.empleado.NoEmpleado;
    for(let i = 0; i < this.accesos.length; i++){
     if(this.accesos[i].User.noEmpleado == this.empleado.NoEmpleado){
       aux = 1;
     }
    }
    if(aux == 1){
      swal.fire('Aviso!', 'El usuario ya existe', 'warning');
    }else{
      this.accesos[this.accesos.length]= {'User':usuario, Empresas: '', IMA: false,  EBR: false}; 
    }
  }
  modificarUser(acc){
        this.accesosService.AgregarAcceso( acc )
        .subscribe( () => {
          //this.cargarAreas();
          swal.fire('Se guardaron los cambios','', 'success');
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
  }
  public changeact(value, acc, empr ){
        if(empr == "IMA"){
          acc.IMA = value.target.checked;
        }
        if(empr == "EBR"){
          acc.EBR = value.target.checked;
        }
        //this.proyecto.Estado = value.target.checked; 
    }
  buscarEquipoEmpleado() {
    this.cargando = true;
    this.verPDFViewer = false;
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
