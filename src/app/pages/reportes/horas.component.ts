import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Usuario, Parametros, Reporte } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
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
export class HorasComponent implements OnInit {

  // Para rango de fechas
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  filtros: Parametros = new Parametros();
  cargando = false;
  admins: Usuario[];
  horas: Reporte[] = [];
  TotalHoras: number = 0;

  constructor(public calendar: NgbCalendar,
    public _reporteService: ReportesService,
    public _adminService: UsuarioService,
    config: NgbAccordionConfig) {
      config.closeOthers = false;
      config.type = 'info';
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getToday();
    }

  ngOnInit() {
    this.cargarAdmins();
  }

  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: any) => {
      this.admins = resp;
    });
  }

  TotalUnidad (lst: Reporte[]): number {
    let uniTotal = lst.reduce((sum, item) => sum + item.Horas, 0);
    return uniTotal;
  }

  cargarReporte() {
    if (this.fromDate === null || this.toDate === null) {
      return;
    }
    this.cargando = true;
    this.filtros.fechaInicial = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.filtros.fechaFinal = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this._reporteService.obtenerHoras( this.filtros )
    .subscribe((resp: Reporte[]) => {
      this.horas = resp;
      this.cargando = false;
      this.TotalHoras = this.horas.reduce((sum, item) => sum + item.Horas, 0);
    });
  }

  // Funciones para Rango de Fechas

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

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
