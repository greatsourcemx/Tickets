import { Component, OnInit } from '@angular/core'; 
import { BitacoraRh } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import { GroupByPipe } from '../../pipes/group-by.pipe'; 
import { NgbDateStruct, NgbCalendar, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Listados, Parametros } from '../../models/models.index';
import Json from '../../../assets/json/range.json';

import { GlpiService, ExcelService } from '../../services/service.index';
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

  
@Component({
  selector: 'app-consrh',
  templateUrl: './consrh.component.html',
  styleUrls: ['../agenda/agenda.component.css'],
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

export class ConsRHComponent implements OnInit {
  bitacora: BitacoraRh[]; 
  cargando = false; 
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  query = '';
  rangos: Listados[] = [];

  isAdmin = false;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  param: Parametros = new Parametros();

  constructor( 
    public calendar: NgbCalendar, 
    public _reporteService: ReportesService,
    public _adminService: UsuarioService,
    public _groupBy: GroupByPipe,
    public glpiService: GlpiService, ) {  
      this.rangos = Json.Rangos;
  }

  ngOnInit() {
    this.cargaCons(); 
  }
  cargaCons() { 
    this.cargando = true; 
    this.glpiService.cargarBitacorarh( )
    .subscribe((data) => {
      this.cargando = false;
      this.bitacora = data;
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
  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
   generar() {
    try{
    this.param.fechaInicial = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.param.fechaFinal = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
  }catch{

  } 
    this.cargando = true; 
    this.glpiService.cargarBitacorarh2(this.param )
    .subscribe((data) => {
      this.cargando = false;
      this.bitacora = data;
    });
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
