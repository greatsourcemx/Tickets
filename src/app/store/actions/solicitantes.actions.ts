import { Action } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const LOAD_USERS = '[MARK] Carga los solicitantes...';
export const LOAD_USERS_FAIL = '[MARK] Error cargar solicitantes...';
export const LOAD_USERS_SUCCESS = '[MARK] Correcto solicitantes...';

export class LoadUsersAction implements Action {
    readonly type = LOAD_USERS;
}

export class LoadUsersFailAction implements Action {
    readonly type = LOAD_USERS_FAIL;
    constructor ( public payload: any ) {  }
}

export class LoadUsersSuccessAction implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor ( public users: Usuario[] ) {  }
}

export type soliAcciones = LoadUsersAction |
                        LoadUsersFailAction |
                        LoadUsersSuccessAction;
