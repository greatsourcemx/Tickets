import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as markActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { of } from 'rxjs';
import { Principal } from '../../models/principal.model';

@Injectable()
export class MarcadoresEffects {

    constructor(private actions$: Actions,
                public servService: ServiciosService) { }

    @Effect()
    cargarMarcador$ = this.actions$.pipe(
            ofType( markActions.LOAD_MARK )
        ).pipe(
            switchMap( () => {
                return this.servService.cargarDashboard()
                .pipe(
                    map( (principal: Principal) => new markActions.LoadMarkSuccessAction( principal ) ),
                    catchError( error => of(new markActions.LoadMarkFailAction( error )) )
                );
            })
        );

}
