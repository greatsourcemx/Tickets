import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../../services/service.index';
import { Listados, Graficas, Usuario, TopSolicitantes } from '../../../models/models.index';
import SampleJson from '../../../../assets/json/range.json';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-top-solicitantes',
  templateUrl: './top-solicitantes.component.html',
  styles: []
})
export class TopSolicitantesComponent implements OnInit {

  grafica: Graficas = new Graficas();
  top: Graficas = new Graficas();
  rangos: Listados[] = [];
  rango = '';
  cargando = false;

  constructor(public grafServicios: GraficasService,
              public store: Store<AppState>) {
    this.rangos = SampleJson.Rangos;
    this.store.select('marcadores')
                .subscribe( principal => {
                  if (this.rango !== principal.filtro) {
                    this.rango = principal.filtro;
                    this.cargarTopSolicitantes();
                  }
                });
  }

  ngOnInit() {
  }

  cargarTopSolicitantes() {
    this.cargando = true;
    this.top = new Graficas();
    this.grafServicios.cargarTopSolicitantes( this.rango )
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
