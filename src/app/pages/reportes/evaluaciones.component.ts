import { Component, OnInit } from '@angular/core';
import { Listados, Parametros } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
 
import Json from '../../../assets/json/range.json';
import { Rating } from '../../models/rating.model';
import { Usuario } from '../../models/usuario.model';
import { NgbDateStruct, NgbCalendar, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from '../../models/empresa.model';
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`]
})
export class EvaluacionesComponent implements OnInit {
// Para rango de fechas
displayMonths = 2;
navigation = 'select';
showWeekNumbers = false;
hoveredDate: NgbDateStruct;
fromDate: NgbDateStruct;
toDate: NgbDateStruct;


  ratings: Rating[] = null;
  rangos: Listados[] = [];
  empresas: Empresa[] = null;
  param: Parametros = new Parametros();
  users: Usuario[] = null;
  muestra: boolean =false;


  constructor(
    public calendar: NgbCalendar,
      public reporteService: ReportesService,
              public empresaData: EmpresasService,
              public adminService: UsuarioService,
              config: NgbAccordionConfig) {
                config.closeOthers = false;
                config.type = 'info';
                this.fromDate = calendar.getToday();
                this.toDate = calendar.getToday();
                this.rangos = Json.Rangos;
                this.adminService.esAdmin()
                .subscribe((data: boolean) => {
                  if (data) {
                    this.cargarUsuarios();
                  }
                });
              }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaData.cargarEmpresasActivas()
    .subscribe((data: Empresa[]) => {
      this.empresas = data;
    });
  }

  cargarUsuarios() {
    this.adminService.cargarUsuaActivos()
    .subscribe((data: Usuario[]) => {
      this.users = data;
      for (const item of this.users) {
        if (item.nombre === 'TODOS') {
          item.nombre = 'TODOS';
        }
      }
    });
  }
  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  generar() {
    this.param.fechaInicial = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.param.fechaFinal = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.reporteService.obtenerEvaluaciones( this.param )
    .subscribe((data: Rating[]) => {
      this.ratings = data;
    });
  }

  promedio(): number {
    let prom = 0;
    for (const item of this.ratings) {
      prom += item.rating;
    }
    return (prom / this.ratings.length);
  }
  public EditarP(proyecto) {
    debugger;
    if(proyecto == "Otra" || proyecto == "OTRA"){
      $('#calendario').show();

    }else{
            $('#calendario').hide();

    }
      
}
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}
