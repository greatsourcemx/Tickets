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
  top: Graficas = new Graficas();
  param: Parametros = new Parametros();
  cargando = false;

  constructor(public grafServicios: GraficasService,
              public store: Store<AppState>) {
                this.store.select('marcadores')
                  .subscribe( principal => {
                    if (this.param.rango !== principal.param.rango) {
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
    this.top = new Graficas();
    this.grafServicios.cargarTopSolicitantes( this.param )
    .subscribe((data: Graficas) => {
      this.cargando = false;
      this.grafica = data;
      let i: number = 0;
      let OPct: number = 0;
      let OTotal: number = 0;
      for ( let item of this.grafica.topSolicitantes ) {
        if ( i < 5 ) {
          this.top.topSolicitantes.push( item );
        } else {
          OPct = OPct + item.porcentaje;
          OTotal = OTotal + item.total;
        }
        i++;
      }
      // agregar el otros
      if (OTotal > 0) {
        this.top.topSolicitantes.push( new TopSolicitantes( new Usuario('', '', 'Otros'), OTotal, OPct ));
      }
    });
  }

}
