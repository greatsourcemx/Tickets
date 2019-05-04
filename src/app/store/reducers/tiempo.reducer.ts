import { Tiempo } from '../../models/tiempo.model';
import * as fromTiempo from '../actions/index';

export interface TiempoState {
    tiempos: Tiempo[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: TiempoState = {
    tiempos: null,
    loaded: false,
    loading: false,
    error: null
};

export function tiempoReducer( state = initState, action: fromTiempo.timerAcciones ): TiempoState {
    switch ( action.type ) {
        case fromTiempo.LOAD_TIMERS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromTiempo.LOAD_TIMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: null,
                tiempos: [ ...action.duracion ]
            };
        case fromTiempo.LOAD_TIMERS_FAIL:
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
