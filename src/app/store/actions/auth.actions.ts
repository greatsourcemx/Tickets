import { Action } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';


export const SET_USER = '[Auth] Cargar Usuario logueado...';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor( public usuario: Usuario) { }
}

export type acciones = SetUserAction;
