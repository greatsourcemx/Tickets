import { Action } from '@ngrx/store';
import { Tiempo } from '../../models/tiempo.model';

export const LOAD_TIMERS = '[SERV] Carga los tiempos...';
export const LOAD_TIMERS_FAIL = '[SERV] Error cargar tiempos...';
export const LOAD_TIMERS_SUCCESS = '[SERV] Cargado correcto tiempos...';

export class LoadTimerAction implements Action {
    readonly type = LOAD_TIMERS;
}

export class LoadTimerFailAction implements Action {
    readonly type = LOAD_TIMERS_FAIL;
    constructor ( public payload: any ) {  }
}

export class LoadTimerSuccessAction implements Action {
    readonly type = LOAD_TIMERS_SUCCESS;
    constructor( public duracion: Tiempo[] ) { }
}

export type timerAcciones = LoadTimerAction |
                            LoadTimerFailAction |
                            LoadTimerSuccessAction;
