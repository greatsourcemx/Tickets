import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as soliActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';
import { of } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class SolicitantesEffects {

    constructor(private actions$: Actions,
                public soliService: SolicitanteService) { }

    @Effect()
    cargarSolicitante$ = this.actions$.pipe(
            ofType( soliActions.LOAD_USERS )
        ).pipe(
            switchMap( () => {
                return this.soliService.cargarSoliActivos()
                .pipe(
                    map( (usuarios: Usuario[]) => new soliActions.LoadUsersSuccessAction( usuarios ) ),
                    catchError( error => of(new soliActions.LoadUsersFailAction( error )) )
                );
            })
        );

}
