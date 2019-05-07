import { Component, OnInit } from '@angular/core';
import { Principal } from '../../models/models.index';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as markActions from '../../store/actions';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: []
})
export class MarcadoresComponent implements OnInit {

  principal: Principal = new Principal();
  loading = false;
  error: any;
  range = 'HOY';

  constructor(public store: Store<AppState>) {
    this.store.select('marcadores')
    .subscribe( principal => {
      this.range = principal.filtro;
      console.log(this.range);
    });
  }

  ngOnInit() {
    this.cargarInfoPrincipal();
    this.store.dispatch( new markActions.LoadUsersAction() );
    this.store.dispatch( new markActions.LoadMarkAction( this.range ) );
  }

  cargarInfoPrincipal () {
    this.store.select('marcadores')
    .subscribe( principal => {
      this.principal = principal.principal;
      this.loading = principal.loading;
      this.error = principal.error;
    });
  }

  changeSelect() {
    this.store.dispatch( new markActions.LoadMarkAction( this.range ) );
  }

}
