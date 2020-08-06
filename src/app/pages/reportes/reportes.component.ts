import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Servicio, Usuario, Parametros, Reporte, PorcentajeUser } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import { GroupByPipe } from '../../pipes/group-by.pipe';
import { Color, ChartOptions, ChartType, ChartDataSets, Label, pluginDataLabels } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
//import { Label } from 'ng2-charts';



const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
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

export class ReportesComponent implements OnInit {

  // Para rango de fechas
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  filtros: Parametros = new Parametros();
  porcentaje: Reporte[];
  porcentajeusr: PorcentajeUser[];
  cargando = false;
  admins: Usuario[];
  Total: number;
  IMA: number = 0;
  EBR: number = 0;
  horasgima: number[];
  horasggs: number[];
  nombresg: string[];
  pieima: number;
  piegs: number;
  dec: number;

public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = ['IMA', 'EBR'];
public pieChartData: number[] = [this.pieima, this.piegs];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(22,36,185,0.3)', 'rgba(82,183,74,0.3)'],
  },
];
   public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public lineChartColors: Color[] = [
    { //azul
      backgroundColor: 'rgba(22,36,185,0.7)',
      borderColor: 'rgba(36,144,227,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointHoverBorderColor: 'rgba(47,55,143,0.7)'


    },
    { //verde
      backgroundColor: 'rgba(82,183,74,0.7)',
      borderColor: 'rgba(75,211,150,1)',
      pointBackgroundColor: 'rgba(82,183,74,0.7)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    }
  ];
  public barChartLabels: Label[] = this.nombresg;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.horasgima, label: 'IMA' },
    { data: this.horasggs, label: 'EBR' }
  ];

  // Grafica (Doughnut)
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'pie';
  public colors = [
    {
      backgroundColor: [
        'rgba(46, 54, 143, 1)',
        'rgba(81 , 183, 73, 1)',
        'rgba(255, 178, 43, 1)'
      ]
    }
  ];

  constructor(
    public calendar: NgbCalendar,
    public _reporteService: ReportesService,
    public _adminService: UsuarioService,
    public _groupBy: GroupByPipe,
    config: NgbAccordionConfig) {
      config.closeOthers = false;
      config.type = 'info';
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getToday();
  }

  ngOnInit() {
    this.filtros.responsable.nombre.trim() !== 'TODOS';
    this.cargarAdmins();
    //this.cargarReporte ();
   
  }
  changeFn() {
    var element = <HTMLInputElement> document.getElementById("botonG");
    element.disabled = false;

}
  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: any) => {
      debugger;
      for(let i = 0; i < resp.length; i++){
        if(resp[i].noEmpleado == 459){
            resp.splice(i, 1)
        }    
    }

      this.admins = resp;
    });
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  cargarReporte () {
debugger;
    if (this.fromDate === null || this.toDate === null) {
      return;
    }
    this.IMA=0;
    this.EBR=0;
    this.cargando = true;
    this.filtros.fechaInicial = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.filtros.fechaFinal = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.filtros.rango = '';
    this._reporteService.obtenerPorcentajes( this.filtros )
    .subscribe((resp: Reporte[]) => {
      this.porcentaje = resp;
      this.cargando = false;
      this.Total = this.porcentaje.reduce((sum, item) => sum + item.Horas, 0);
      this.grafica(resp);
      for (let i = 0; i < resp.length; i++) {
          if(resp[i].Empresa == 'IMA'){
            this.IMA = this.IMA + resp[i].Horas;
          }
          if(resp[i].Empresa == 'EBR'){
            this.EBR =this.EBR + resp[i].Horas;
          }
        }
    });
    this._reporteService.obtenerPorUser( this.filtros )
    .subscribe((resp: PorcentajeUser[]) => {
      this.porcentajeusr = resp;
      this.horasgima =[5,5,5,5,5];
      this.horasggs =[5,5,5,5,5];
      this.nombresg=['','','','',''];
      //this.Total = this.porcentaje.reduce((sum, item) => sum + item.Horas, 0);
      //this.grafica(resp);
      for (let i = 0; i < resp.length; i++) {
        this.horasggs[i] = resp[i].HorasEBR;
        this.horasgima[i] = resp[i].HorasIMA;
        this.nombresg[i] = resp[i].usuario.nombre;
        this.pieima = resp[i].HorasIMA;
        this.piegs= resp[i].HorasEBR;
        
         /* if(resp[i].Empresa == 'IMA'){
            this.IMA = this.IMA + resp[i].Horas;
          }
          if(resp[i].Empresa == 'EBR'){
            this.EBR =this.EBR + resp[i].Horas;*/
          }
          this.barChartData[0].data = this.horasgima;
          this.barChartData[1].data = this.horasggs;

    });

  }
  obtTotalh(horas: number){
    var hr =this.obtHoras(horas) + "H " + this.obtMin(horas) + "m";
    return hr;
  }
  obtMin(horas: number){
    var decimales = (horas % 1).toFixed(2);
    this.dec=Number(decimales);
    return Math.round(this.dec * 60);

  }
  obtHoras(horas: number){
    return Math.trunc(horas);

  }
  porcentajeHoras(hemp: number, totalh: number){
    var total =(hemp / totalh) * 100;
    return Number(total.toFixed(2));
  }
  porcentajeHorasTotal(hemp: number, totalh: number){
    debugger;
    var total =(hemp / this.porcentajeusr[5].horas) * 100;
    return Number(total.toFixed(2));
  }
  grafica ( data: Reporte[] ) {
    debugger;
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    let unidades: any = this._groupBy.transform(data, 'Empresa');
    unidades.forEach(element => {
      let uniTotal: number = element.value.reduce((sum, item) => sum + item.Horas, 0);
      let porce: number = (uniTotal  / this.Total) * 100;
      this.doughnutChartLabels.push(element.key);
      this.doughnutChartData.push(Number(porce.toFixed(2)));
    });
  }

  porcenUnidad (lst: Reporte[]): number {
    let uniTotal = lst.reduce((sum, item) => sum + item.Horas, 0);
    return (uniTotal  / this.Total);
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
