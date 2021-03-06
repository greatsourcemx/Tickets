import { Component, OnInit } from '@angular/core';
import { Graficas, Listados } from '../../../models/models.index';
import { GraficasService } from '../../../services/service.index';
import SampleJson from '../../../../assets/json/range.json';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import * as markActions from '../../../store/actions';
import { Parametros } from '../../../models/parametros.model';

@Component({
  selector: 'app-contadores',
  templateUrl: './contadores.component.html',
  styles: [],
  styleUrls: ['../../agenda/agenda.component.css']

})
export class ContadoresComponent implements OnInit {

  grafica: Graficas = null;
  rangos: Listados[] = [];
  loading = false;
  param: Parametros = new Parametros();
  empresa: string;

  constructor(public grafServicios: GraficasService,
              public store: Store<AppState>) {
                this.rangos = SampleJson.Rangos;
                this.store.select('marcadores')
                .subscribe( principal => {
                  this.param = principal.param;
                });
              }

  ngOnInit() {
    this.cargarContadores();
  }
  cargarAgendasu(empr){
    debugger;

    this.empresa= empr;
    this.cargarContadores();
  }
  cargarContadores() {
    debugger;
    this.loading = true;
    this.param.empresa = this.empresa;
    this.grafServicios.cargarContadores( this.param )
    .subscribe((resp: Graficas) => {
      this.loading = false;
      this.store.dispatch( new markActions.LoadMarkAction( this.param ) );
      this.grafica = resp;
    });
  }

}
