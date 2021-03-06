import * as fromMark from '../actions/index';
import { Principal } from '../../models/principal.model';
import { Parametros } from '../../models/parametros.model';

export interface MarkerState {
    principal: Principal;
    loaded: boolean;
    loading: boolean;
    error: any;
    param: Parametros;
}

const initState: MarkerState = {
    principal: null,
    loaded: false,
    loading: false,
    error: null,
    param: new Parametros()
};

export function marcadorReducer( state = initState, action: fromMark.markAcciones ): MarkerState {
    switch ( action.type ) {
        case fromMark.LOAD_MARK:
            return {
                ...state,
                loading: true,
                error: null,
                param: action.payload
            };
        case fromMark.LOAD_MARK_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                principal: action.principal
            };
        case fromMark.LOAD_MARK_FAIL:
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
