import { Action } from '@ngrx/store';
import { Servicio } from '../../models/servicio.model';

export const LOAD_NOTIFICATION = '[NOTIFICATION] Carga las notificaciones...';
export const LOAD_NOTIFICATION_FAIL = '[NOTIFICATION] Error al leer notificaciones...';
export const LOAD_NOTIFICATION_SUCCESS = '[NOTIFICATION] Correcta lectura notificaciones...';

export class LoadNotificationAction implements Action {
    readonly type = LOAD_NOTIFICATION;
    constructor( public payload: Servicio[] ) { }
}
export class LoadNotificationFailAction implements Action {
    readonly type = LOAD_NOTIFICATION_FAIL;
    constructor( public payload: any ) { }
}
export class LoadNotificationSuccessAction implements Action {
    readonly type = LOAD_NOTIFICATION_SUCCESS;
    constructor( public servicios: Servicio[] ) { }
}

export type notiAcciones = LoadNotificationAction |
                            LoadNotificationSuccessAction |
                            LoadNotificationFailAction;
