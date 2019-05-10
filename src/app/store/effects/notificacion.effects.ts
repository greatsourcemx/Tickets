import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsuarioService } from '../../services/usuario/usuario.service';
import * as notiActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Servicio } from '../../models/servicio.model';
import { of } from 'rxjs';

@Injectable()
export class NotificacionEffects {
    constructor(private actions$: Actions,
                public usuarioService: UsuarioService) { }

    @Effect()
    cargarNotificacion$ = this.actions$.pipe(
        ofType( notiActions.LOAD_NOTIFICATION )
    ).pipe(
        switchMap( ( action: any ) => {
            return this.usuarioService.notificaciones( action.payload )
            .pipe(
                map( (resp: Servicio[]) => new notiActions.LoadNotificationSuccessAction( resp ) ),
                catchError( error => of( new notiActions.LoadNotificationFailAction( error )) )
            );
        })
    );
}
