import { Action } from '@ngrx/store';
import { Principal } from '../../models/principal.model';
import { Parametros } from '../../models/parametros.model';

export const LOAD_MARK = '[MARK] Carga los marcadores...';
export const LOAD_MARK_FAIL = '[MARK] Error cargar marcadores...';
export const LOAD_MARK_SUCCESS = '[MARK] Correcto marcadores...';

export class LoadMarkAction implements Action {
    readonly type = LOAD_MARK;
    constructor ( public payload: Parametros ) {  }
}

export class LoadMarkFailAction implements Action {
    readonly type = LOAD_MARK_FAIL;
    constructor ( public payload: any ) {  }
}

export class LoadMarkSuccessAction implements Action {
    readonly type = LOAD_MARK_SUCCESS;
    constructor ( public principal: Principal ) {  }
}

export type markAcciones = LoadMarkAction |
                        LoadMarkFailAction |
                        LoadMarkSuccessAction;
