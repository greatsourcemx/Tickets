import { Action } from '@ngrx/store';
import { Servicio } from '../../models/servicio.model';

export const LOAD_SERV = '[SERV] Carga los tickets...';
export const LOAD_SERV_FAIL = '[SERV] Error cargar tickets...';
export const LOAD_SERV_SUCCESS = '[SERV] Correcto cargar tickets...';

export const LOAD_SERV_SOLI = '[SERV] Carga los tickets del solicitante...';
export const LOAD_SERV_SOLI_FAIL = '[SERV] Error cargar tickets del solicitante...';
export const LOAD_SERV_SOLI_SUCCESS = '[SERV] Correcto cargar tickets del solicitante...';

// Super administradores
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
// Solicitante
export class LoadServSoliAction implements Action {
    readonly type = LOAD_SERV_SOLI;
    constructor( public payload: number ) { }
}

export class LoadServSoliFailAction implements Action {
    readonly type = LOAD_SERV_SOLI_FAIL;
    constructor ( public payload: any ) {  }
}

export class LoadServSoliSuccessAction implements Action {
    readonly type = LOAD_SERV_SOLI_SUCCESS;
    constructor ( public servicios: Servicio[] ) {  }
}

export type acciones = LoadServAction |
                        LoadServFailAction |
                        LoadServSuccessAction |
                        LoadServSoliAction |
                        LoadServSoliFailAction |
                        LoadServSoliSuccessAction;
