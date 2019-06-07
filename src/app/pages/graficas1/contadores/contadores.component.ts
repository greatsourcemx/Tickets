import { Component, OnInit } from '@angular/core';
import { Graficas, Listados } from '../../../models/models.index';
import { GraficasService } from '../../../services/service.index';
import SampleJson from '../../../../assets/json/range.json';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as markActions from '../../../store/actions';

@Component({
  selector: 'app-contadores',
  templateUrl: './contadores.component.html',
  styles: []
})
export class ContadoresComponent implements OnInit {

  grafica: Graficas = null;
  rangos: Listados[] = [];
  loading = false;
  rango = 'HOY';

  constructor(public grafServicios: GraficasService,
              public store: Store<AppState>) {
                this.rangos = SampleJson.Rangos;
                this.store.select('marcadores')
                .subscribe( principal => {
                  this.rango = principal.filtro;
                });
              }

  ngOnInit() {
    this.cargarContadores();
  }

  cargarContadores() {
    this.loading = true;
    this.grafServicios.cargarContadores( this.rango )
    .subscribe((resp: Graficas) => {
      this.loading = false;
      this.store.dispatch( new markActions.LoadMarkAction( this.rango ) );
      this.grafica = resp;
    });
  }

}
