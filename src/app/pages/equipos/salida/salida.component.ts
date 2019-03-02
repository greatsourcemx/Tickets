import { Component, OnInit } from '@angular/core';
import { GlpiService } from '../../../services/GLPI/glpi.service';
import { GLPIEmpleado } from '../../../models/models.index';
import { RetornoEquipo } from '../../../models/retorno.model';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styles: []
})
export class SalidaComponent implements OnInit {

  empresa = 'EBR';
  empleados: GLPIEmpleado[] = [];
  empleado: GLPIEmpleado = new GLPIEmpleado();
  equipos: RetornoEquipo[] = [];
  cargando = false;
  msg = false;
  verRetorno = false;
  retorTodos = false;

  constructor(public glpiService: GlpiService) { }

  ngOnInit() {
    this.seleccionEmpresa( this.empresa );
  }

  seleccionEmpresa( empresa: string ) {
    this.cargando = true;
    this.empresa = empresa;
    this.glpiService.cargarEntregaGLPI( this.empresa )
    .subscribe((data: any) => {
      this.empleado = new GLPIEmpleado();
      this.empleados = data.Empleados;
      this.equipos = [];
      this.cargando = false;
    });
  }

  buscarEquipo() {
    this.cargando = true;
    this.glpiService.cargarEquipoEmpleado( this.empleado, this.empresa )
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
    this.glpiService.retornarEquipo( this.equipos, this.empresa )
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

  verPDF( folio: number ) {
    this.cargando = true;
    this.glpiService.verPDFFolio( folio, this.empresa )
    .subscribe((data: any) => {
      this.cargando = false;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

}
