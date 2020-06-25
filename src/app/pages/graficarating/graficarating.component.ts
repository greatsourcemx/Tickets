import { Component, OnInit } from '@angular/core';
import { Listados, Parametros } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import Json from '../../../assets/json/range.json';
import { Rating } from '../../models/rating.model';
import { Usuario } from '../../models/usuario.model';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from '../../models/empresa.model';
import { GraficaAnio } from '../../models/graficaratanio.model';
import { GraficaRating } from '../../models/graficarating.model';

import { Color, ChartOptions, ChartType, ChartDataSets, Label, pluginDataLabels, plugins, } from 'chart.js';


@Component({
  selector: 'app-graficarating',
  templateUrl: './graficarating.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css']
})
export class GraficaRatings implements OnInit {

  ratings: Rating[];
  rangos: Listados[] = [];
  empresas: Empresa[] = null;
  param: Parametros = new Parametros();
  users: Usuario[] = null;
  public semarating: number[] = null;
  public sematotal: number[]= null;
  public semanum: number[]=null;
  public semaselect: number=0;
  public empresa: string ="Todos";
  public s1d: number[]=[0];
  public s2d: number[]=[0];
  public   l1d: string= '';
  public   l2d: string= '';

  public s1d2: number[]=[0];
  public s2d2: number[]=[0];
  public   l1d2: string= '';
  public   l2d2: string= '';
  //BarGraf
  datosBar: any[]=null;
  mesesBar: string[]=null;
  aniosBar: number[]=null;
  graficasanio: GraficaAnio[] = null;
  tablarating: GraficaRating[];
  public barChartLabels: Label[] = ['','','','','','','','','','','',''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartLabelsSemana: Label[] = [];
  public barChartLabelsSemana1: Label[] = [];
  public barChartDataSemana: ChartDataSets[] = [
    { data: this.s2d, label: this.l2d },
    { data: this.s1d, label: this.l1d }
  ];
  public barChartDataSemana2: ChartDataSets[] = [
    { data: this.s2d2, label: this.l2d2 },
    { data: this.s1d2, label: this.l1d2 }
  ];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'IMA' },
    { data: [], label: 'EBR' }
  ];
  public barChartDatatotal: ChartDataSets[] = [
    { data: [], label: 'IMA' },
    { data: [], label: 'EBR' }
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
  //BarGraf
  public barChartLabelsp: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartTypep: ChartType = 'bar';
  public barChartLegendp = true;
  public barChartPluginsp = [pluginDataLabels];

  public barChartDatap: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  constructor(public reporteService: ReportesService,
              public empresaData: EmpresasService,
              public adminService: UsuarioService) {
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
    this.generarSemanal();
    this.generar();
  
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public randomizep(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartDatap[0].data = data;
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
          item.nombre = 'Todos';
        }
      }
    });
  }

  generar() {
    
    var fecha = new Date(); 
    var ano = fecha. getFullYear();
    this.reporteService.obtenerEvaluacionesGraf( this.param )
    .subscribe((data: GraficaAnio[]) => {
      this.graficasanio = data;
      var json = JSON.parse('{}');
      var anios = [];

      var todo =[];
      for(let i = 0; i < data.length; i++){
        var averat = [];
        var meses = [];
        var totalservs = [];
        var mesmenos =[];
        anios[i] = data[i].anio
        for(let z = 0; z < data[i]['ratingmes'].length; z++){
            meses[z] = data[i]['ratingmes'][z].Mes;
            averat[z] = data[i]['ratingmes'][z].AvRating;
            totalservs[z] = data[i]['ratingmes'][z].TotalServs;
            if(ano == data[i].anio){
              if(data[i]['ratingmes'][z]['ratingsmen'].length > 0){
                for(let x = 0; x < data[i]['ratingmes'][z]['ratingsmen'].length; x++){
                  mesmenos[mesmenos.length + 1] = data[i]['ratingmes'][z]['ratingsmen'][x];
                  $('#tablamen').find('tbody').append('<tr>'+
                    '<td style="border-left-style: solid;border-left-color: #5172FF; border-right-style: solid; border-right-color: #5172FF;">'
                    +data[i]['ratingmes'][z].Mes+'</td>'+
                    '<td style="text-align: center; border-right-style: solid; border-right-color: #5172FF;"> '
                    +data[i]['ratingmes'][z]['ratingsmen'][x].servicio.Solicitor.nombre+' </td>'+
                    '<td style="text-align: center;border-right-style: solid; border-right-color: #5172FF;">'+ 
                    data[i]['ratingmes'][z]['ratingsmen'][x].servicio.Id +':'+  
                    data[i]['ratingmes'][z]['ratingsmen'][x].servicio.Titulo  +'</td>'+
                    '<td style="text-align: center;border-right-style: solid; border-right-color: #5172FF;"> '+ 
                    data[i]['ratingmes'][z]['ratingsmen'][x].servicio.AsignadoA.nombre +' </td>'+
                    '<td style="text-align: center;border-right-style: solid;  border-right-color: #4EA7FF;">'+ 
                    data[i]['ratingmes'][z]['ratingsmen'][x].rating +'</td>'+
                    '<td style="text-align: center;border-right-style: solid; border-right-color: #49D2FF;">'+ 
                    data[i]['ratingmes'][z]['ratingsmen'][x].comentario +'</td>'+
                   ' </tr>');
                }
              }
            }
        }
        
        var aux ={};
        aux['data'] = averat;
        aux['label'] = data[i]['anio'];
        aux['datatotal'] = totalservs;
        todo[i] = aux;
        if(ano == data[i].anio){
          this.tablarating = data[i]['ratingmes'];
        }
    }
        this.barChartLabels = meses;
        this.barChartData[0].data = todo[0].data;
        this.barChartData[0].label = todo[0].label;
        this.barChartDatatotal[0].data = todo[0].datatotal;
        this.barChartDatatotal[1].data = todo[1].datatotal;
        
        this.barChartData[1].data = todo[1].data;
        this.barChartData[1].label = todo[1].label;
        this.barChartDatatotal[1].label = todo[1].label;
        this.barChartDatatotal[0].label = todo[0].label;
    });
  }

  promedio(): number {
    let prom = 0;
    for (const item of this.ratings) {
      prom += item.rating;
    }
    return (prom / this.ratings.length);
  }
  generarSemanal() {
    debugger;
    var semanas =[];
    var promedios=[];
    var totales =[];
    var fecha = new Date(); 
    var ano = fecha. getFullYear();
    var ratservs = [];
    this.reporteService.obtenerEvaluacionesSemaGraf( this.param )
    .subscribe((data: GraficaAnio[]) => {

      for(let i = 0; i < data.length; i++){
        var aux2 =1;
        for(let y = 0; y < data[i]['ratingmes'].length; y++){
          try{
            var aux =0;
            var cont =0;
            var sum =0;
            var auxcont = 0;
            for(let x =0; x < data[i]['ratingmes'][y]['ratingsmen'].length; x++){
                auxcont= auxcont+1;
              aux= data[i]['ratingmes'][y]['ratingsmen'][x]['semana'];
              if(aux == aux2){
                cont= cont +1;
                sum = sum + data[i]['ratingmes'][y]['ratingsmen'][x]['rating']
              }else{
                if(!isNaN(sum/cont)){
                    console.log('semana: '+(aux-1)+' Total:'+cont+ 'rating: '+sum/cont);
                    semanas.push(aux-1);
                    totales.push(cont);
                    promedios.push((sum/cont).toFixed(2));
                    cont =0;
                    sum =0;
                    cont= cont +1;
                    sum = sum + data[i]['ratingmes'][y]['ratingsmen'][x]['rating']
                }
              }
              if(auxcont == data[i]['ratingmes'][y]['ratingsmen'].length)
              {
                if(!isNaN(sum/cont)){
                  semanas.push(aux);
                  totales.push(cont);
                  promedios.push((sum/cont).toFixed(2));
                }
                console.log('semana: '+(aux)+' Total:'+cont+ 'rating: '+sum/cont);
                cont =0;
                sum =0;
                cont= cont +1;
                sum = sum + data[i]['ratingmes'][y]['ratingsmen'][x]['rating']
              }
              aux2= data[i]['ratingmes'][y]['ratingsmen'][x]['semana'];
             
            }
          }catch{
             console.log('semana: '+(aux)+' Total:'+cont+ 'rating: '+sum/cont);
        }
        }
      }
      this.s1d[0] = totales[totales.length - 1];
      this.s2d[0] = totales[totales.length - 2];
      this.l1d = 'Semana '+ semanas[semanas.length - 1];
      this.l2d = 'Semana '+ semanas[semanas.length - 2];
      //this.barChartDataSemana[0].data.push(totales[totales.length - 1]);
      //this.barChartDataSemana[1].data.push(totales[totales.length - 2]);
      this.barChartDataSemana[0].label='Semana '+ semanas[semanas.length - 2];
      this.barChartDataSemana[1].label='Semana '+ semanas[semanas.length - 1];
      
      this.barChartLabelsSemana = ['Total Tickets'];
      this.barChartLabelsSemana1 = ['Rating'];

      //this.barChartDataSemana2[0].data.push(promedios[promedios.length - 1]);
      //this.barChartDataSemana2[1].data.push(promedios[promedios.length - 2]);
      this.barChartDataSemana2[0].label='Semana '+ semanas[semanas.length - 2];
      this.barChartDataSemana2[1].label='Semana '+ semanas[semanas.length - 1];

      this.s1d2[0] = promedios[promedios.length - 1];
      this.s2d2[0] = promedios[promedios.length - 2];
      //this.l1d2 = 'Semana '+ semanas[semanas.length - 1];
      //this.l2d2 = 'Semana '+ semanas[semanas.length - 2];

      localStorage.promedios = promedios;
      localStorage.semanas = semanas;
      localStorage.totales = totales;
      this.semanum = semanas;
      localStorage.datatsem = data;
      var min = 12,
      max = 100,
      select = document.getElementById('combosema');
      this.semaselect = semanas[semanas.length - 1]
      $("#combosema").val(semanas[semanas.length - 1]);


      //*this.barChartDataSemana[0].data=[1,2];
      //this.barChartDataSemana[0].data=[5,4];
    });
  }
  cargarSemanas(){
    this.barChartDataSemana2[1].label='Semana 2';
    this.barChartDataSemana[1].label='Semana 4';
    this.barChartDataSemana2[0].data=[7];
    this.barChartDataSemana2[1].data=[4];
    this.barChartDataSemana[0].data=[7];
    this.barChartDataSemana[1].data=[4];

  }

  cargarGraf(empresa){
    if (empresa == "EBR"){
      this.empresa = "GS";
    }else{
      this.empresa = empresa;
    }
    this.param.empresa = empresa;
    this.generarSemanal();
    this.generar();
  }
  public randomize(): void {
    // Only Change 3 values
    var semana = $("#combosema").val()
    semana = semana.toString().split(':')[1].trim();

    this.barChartDataSemana = [
      { data: [Number(localStorage.totales.split(",")[semana])], label: 'Semana '+ semana },
      { data: [Number(localStorage.totales.split(",")[localStorage.totales.split(",").length - 1])],
      label: 'Semana '+ localStorage.semanas.split(",").length}
    ];
    this.barChartDataSemana2 = [
      { data: [Number(localStorage.promedios.split(",")[semana])], label: 'Semana '+ semana },
      { data: [Number(localStorage.promedios.split(",")[localStorage.promedios.split(",").length - 1])],
      label: 'Semana '+ localStorage.semanas.split(",").length}
    ];

    return null
  }
}
