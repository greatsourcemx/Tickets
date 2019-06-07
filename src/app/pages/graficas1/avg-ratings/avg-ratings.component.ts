import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { GraficasService } from '../../../services/service.index';
import { Listados, Graficas } from '../../../models/models.index';
import SampleJson from '../../../../assets/json/range.json';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-avg-ratings',
  templateUrl: './avg-ratings.component.html',
  styles: []
})
export class AvgRatingsComponent implements OnInit {

  grafica: Graficas = new Graficas();
  top: Graficas = new Graficas();
  rangos: Listados[] = [];
  rango = '';
  cargando = false;

  constructor(public grafServicios: GraficasService,
    config: NgbRatingConfig,
    public store: Store<AppState>) {
      this.rangos = SampleJson.Rangos;
      config.max = 5;
      config.readonly = true;
      this.store.select('marcadores')
        .subscribe( principal => {
          if (this.rango !== principal.filtro) {
            this.rango = principal.filtro;
            this.cargarRatings();
          }
      });
  }

  ngOnInit() {
  }

  cargarRatings() {
    this.cargando = true;
    this.grafServicios.cargarTopRating( this.rango )
    .subscribe((data: Graficas) => {
      this.cargando = false;
      this.grafica = data;
    });
  }

}
