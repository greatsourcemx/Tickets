import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as servActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { of } from 'rxjs';

@Injectable()
export class ServiciosEffects {

    constructor(private actions$: Actions,
                public servService: ServiciosService) { }

    @Effect()
    cargarTickets$ = this.actions$.pipe(
            ofType( servActions.LOAD_SERV )
        ).pipe(
            switchMap( () => {
                return this.servService.cargarTickets()
                .pipe(
                    map( tickets => new servActions.LoadServSuccessAction( tickets ) ),
                    catchError( error => of(new servActions.LoadServFailAction( error )) )
                );
            })
        );

}
