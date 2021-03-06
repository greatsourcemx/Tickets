import { Component, OnInit } from '@angular/core';
import { Principal, Listados } from '../../models/models.index';
import Json from '../../../assets/json/range.json';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as markActions from '../../store/actions';
import { Parametros } from '../../models/parametros.model';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css']
})
export class MarcadoresComponent implements OnInit {

  principal: Principal = new Principal();
  rangos: Listados[] = [];
  error: any;
  range: Parametros = new Parametros();
  loaded = false;

  constructor(public store: Store<AppState>) {
    this.rangos = Json.Rangos;
    this.store.select('marcadores')
    .subscribe( principal => {
      this.range = principal.param;
    });
  }

  ngOnInit() {

    this.cargarInfoPrincipal();
    this.store.dispatch( new markActions.LoadUsersAction() );
    this.store.dispatch( new markActions.LoadMarkAction( this.range ) );
  }

  cargarInfoPrincipal () {
    debugger;
    this.store.select('marcadores')
    .subscribe( principal => {
      this.principal = principal.principal;
      this.loaded = principal.loaded;
      this.error = principal.error;
    });
  }

  changeSelect() {
    this.store.dispatch( new markActions.LoadMarkAction( this.range ) );
  }

}
