import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../../services/service.index';
import {  Graficas, Usuario, TopSolicitantes } from '../../../models/models.index';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { Parametros } from '../../../models/parametros.model';

@Component({
  selector: 'app-top-solicitantes',
  templateUrl: './top-solicitantes.component.html',
  styles: []
})
export class TopSolicitantesComponent implements OnInit {

  grafica: Graficas = new Graficas();
  param: Parametros = new Parametros();
  cargando = false;

  constructor(public grafServicios: GraficasService,
              public store: Store<AppState>) {
                this.store.select('marcadores')
                  .subscribe( principal => {
                    if ( this.param.rango !== principal.param.rango ) {
                      this.param.rango = principal.param.rango;
                      this.cargarTopSolicitantes();
                    }
                });
  }

  ngOnInit() {
    this.cargarTopSolicitantes();
  }

  cargarTopSolicitantes() {
    this.cargando = true;
    this.grafica = new Graficas();
    this.grafServicios.cargarTopSolicitantes( this.param )
    .subscribe((data: Graficas) => {
      this.cargando = false;
      this.grafica = data;
    });
  }

}
