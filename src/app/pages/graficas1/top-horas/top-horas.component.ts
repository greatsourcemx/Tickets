import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../../services/service.index';
import { Graficas, Parametros, Usuario } from '../../../models/models.index';
import { TopHoras } from '../../../models/graficas/topHoras.model';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-top-horas',
  templateUrl: './top-horas.component.html',
  styles: []
})
export class TopHorasComponent implements OnInit {

  grafica: Graficas = new Graficas();
  param: Parametros = new Parametros();
  cargando = false;

  constructor(public grafServicios: GraficasService,
    public store: Store<AppState>) {
            this.store.select('marcadores')
                  .subscribe( principal => {
                    if ( this.param.rango !== principal.param.rango || this.param.empresa !== principal.param.empresa) {
                      this.param.rango = principal.param.rango;
                      this.param.empresa = principal.param.empresa;
                      this.cargarTopHoras();
                    }
                });
    }

  ngOnInit() {
    this.cargarTopHoras();
  }

  cargarTopHoras() {
    this.cargando = true;
    this.grafica = new Graficas();
    this.grafServicios.cargarTopHoras( this.param )
    .subscribe((resp: Graficas) => {
      this.cargando = false;
      this.grafica = resp;
    });
  }

}
