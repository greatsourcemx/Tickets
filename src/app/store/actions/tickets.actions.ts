import { Action } from '@ngrx/store';
import { Servicio } from '../../models/servicio.model';

export const LOAD_SERV = '[SERV] Carga los tickets...';
export const LOAD_SERV_FAIL = '[SERV] Error cargar tickets...';
export const LOAD_SERV_SUCCESS = '[SERV] Correcto cargar tickets...';

export class LoadServAction implements Action {
    readonly type = LOAD_SERV;
}

export class LoadServFailAction implements Action {
    readonly type = LOAD_SERV_FAIL;
    constructor ( public payload: any ) {  }
}

export class LoadServSuccessAction implements Action {
    readonly type = LOAD_SERV_SUCCESS;
    constructor ( public servicios: Servicio[] ) {  }
}

export type acciones = LoadServAction |
                        LoadServFailAction |
                        LoadServSuccessAction;
