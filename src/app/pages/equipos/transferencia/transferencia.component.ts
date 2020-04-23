import { Component, OnInit } from '@angular/core';
import { GlpiService } from '../../../services/GLPI/glpi.service';
import { GLPIEmpleado } from '../../../models/GLPIEmpleado.model';
import { RetornoEquipo } from '../../../models/retorno.model';
import { GLPILocacion } from '../../../models/models.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styles: []
})
export class TransferenciaComponent implements OnInit {

  equipos: RetornoEquipo[] = [];
  empleados: GLPIEmpleado[] = [];
  locaciones: GLPILocacion[] = [];
  emplSource: GLPIEmpleado = new GLPIEmpleado();
  emplTarget: GLPIEmpleado = new GLPIEmpleado();
  locacion: GLPILocacion = new GLPILocacion();
  cargando = false;
  equiposCargando = false;
  verTransfer = false;
  transTodos = false;
  firmado = false;
  notas = '';
  empresa = 'EBR';
  verPDFViewer = false;
  pdf: any;

  constructor(public glpiService: GlpiService) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  source() {
    this.equiposCargando = true;
    this.glpiService.cargarEquipoEmpleado( this.emplSource, this.empresa )
    .subscribe((data: RetornoEquipo[]) => {
      this.equiposCargando = false;
      this.equipos = data;
      const more = Math.max.apply(Math, this.equipos.map(function(o) { return o.locacion.Id; }));
      this.locacion = this.locaciones.find( l => l.Id === more );
    });
  }

  seleccionEmpresa( empresa: string ) {
    this.verPDFViewer = false;
    this.pdf = null;
    this.empresa = empresa;
    this.cargarEmpleados();
    this.nuevo();
  }

  cargarEmpleados() {
    this.cargando = true;
    this.glpiService.cargarEntregaGLPI( this.empresa )
    .subscribe((data: any) => {
      for(let i = 0; i < data.Empleados.length; i++){
        if(data.Empleados[i].Correo == JSON.parse(localStorage.usuario).correo){
                data.Empleados.splice(i, 1)
            }
        }
      this.cargando = false;
      this.empleados = data.Empleados;
      this.locaciones = data.Locacion;
    });
  }

  cargarEquipos() {
    this.cargando = true;
  }

  TransTodos() {
    for ( const entr of this.equipos ) {
      entr.retornar = this.transTodos;
      entr.transferir = this.transTodos;
    }
    this.verBotones();
  }

  verBotones() {
    this.verTransfer = false;
    for ( const entr of this.equipos ) {
      if ( entr.transferir ) {
        this.verTransfer = true;
      }
    }
  }

  nuevo() {
    this.equipos = [];
    this.empleados = [];
    this.locaciones = [];
    this.emplSource = new GLPIEmpleado();
    this.emplTarget = new GLPIEmpleado();
    this.locacion = new GLPILocacion();
    this.cargando = false;
    this.equiposCargando = false;
    this.verTransfer = false;
    this.transTodos = false;
    this.firmado = false;
    this.notas = '';
  }

  transferir() {
    if ( this.emplTarget.Id === 0 ) {
      swal.fire('Advertencia', 'Debe seleccionar el empleado que recibe', 'warning' );
      return;
    }
    for ( const entr of this.equipos ) {
        entr.retornar = entr.transferir;
        entr.empresa = this.empresa;
        entr.empleado = this.emplSource;
        entr.transEmpleado = this.emplTarget;
        entr.transLocacion = this.locacion;
        entr.transFirmado = this.firmado;
        entr.transNotas = this.notas;
    }
    this.cargando = true;
    this.glpiService.retornarEquipo( this.equipos, this.empresa, true )
    .subscribe((data: any) => {
      this.cargando = false;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
      this.nuevo();
    });
  }

  verPDF( folio: number ) {
    this.cargando = true;
    this.verPDFViewer = false;
    this.glpiService.verPDFFolio( folio, this.empresa )
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
