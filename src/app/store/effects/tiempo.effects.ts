import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TiempoService } from '../../services/tiempo/tiempo.service';
import * as tiempoActions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Tiempo } from '../../models/tiempo.model';
import { of } from 'rxjs';

@Injectable()
export class TiempoEffects {

    constructor(private actions$: Actions,
                public tiempoService: TiempoService) { }

    @Effect()
    cargarTiempos$ = this.actions$.pipe(
        ofType( tiempoActions.LOAD_TIMERS )
    ).pipe(
        switchMap( () => {
            return this.tiempoService.cargarTiemposActivos()
            .pipe(
                map( (tiempos: Tiempo[]) => new tiempoActions.LoadTimerSuccessAction( tiempos ) ),
                catchError( error => of( new tiempoActions.LoadTimerFailAction( error ) ) )
            );
        })
    );
}
