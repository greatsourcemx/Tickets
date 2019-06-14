import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes/reportes.service';
import { Parametros, Reporte } from '../../../models/models.index';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-avg-empresas',
  templateUrl: './avg-empresas.component.html',
  styles: []
})
export class AvgEmpresasComponent implements OnInit {

  param: Parametros = new Parametros();
  reporte: Reporte[] = [];
  cargando = false;
  Total: number;

  constructor(public rptService: ReportesService,
              public store: Store<AppState>) {
                this.store.select('marcadores')
                .subscribe( principal => {
                  if (this.param.rango !== principal.param.rango) {
                    this.param.rango = principal.param.rango;
                    this.cargarPorcentaje();
                  }
                });
  }

  ngOnInit() {
    this.cargarPorcentaje();
  }

  cargarPorcentaje() {
    this.cargando = true;
    this.rptService.obtenerPorcentajes( this.param )
    .subscribe((data: Reporte[]) => {
      this.cargando = false;
      this.reporte = data;
      this.Total = this.reporte.reduce((sum, item) => sum + item.Horas, 0);
    });
  }

  porcenUnidad (lst: Reporte[]): number {
    let uniTotal = lst.reduce((sum, item) => sum + item.Horas, 0);
    return (uniTotal  / this.Total);
  }

  changeValue() {
    this.cargarPorcentaje();
  }

}
