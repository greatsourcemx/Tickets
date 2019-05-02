import * as fromAuth from '../actions/auth.actions';
import { Usuario } from '../../models/usuario.model';

export interface AuthState {
    usuario: Usuario;
}

const initState: AuthState = {
    usuario: localStorage.getItem('usuario') ?  JSON.parse(localStorage.getItem('usuario')) : null
};

export function authReducer(  state = initState, action: fromAuth.acciones ): AuthState {
    switch ( action.type ) {
        case fromAuth.SET_USER:
            return {
                usuario: { ... action.usuario }
            };
        default:
            return state;
    }
}
