import * as fromSoli from '../actions/index';
import { Usuario } from '../../models/usuario.model';

export interface SoliState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: SoliState = {
    users: null,
    loaded: false,
    loading: false,
    error: null
};

export function solicitantesReducer( state = initState, action: fromSoli.soliAcciones ): SoliState {
    switch ( action.type ) {
        case fromSoli.LOAD_USERS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromSoli.LOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [ ... action.users ]
            };
        case fromSoli.LOAD_USERS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        default:
            return state;
    }
}
