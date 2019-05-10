import * as fromNoti from '../actions/index';
import { Servicio } from '../../models/servicio.model';

export interface NotifiState {
    notificaciones: Servicio[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initState: NotifiState = {
    notificaciones: null,
    loaded: false,
    loading: false,
    error: null
};

export function notificacionReducer( state = initState, action: fromNoti.notiAcciones ): NotifiState {

    switch ( action.type ) {
        case fromNoti.LOAD_NOTIFICATION:
            return {
                ...state,
                loading: true,
                error: null
            };
        case (fromNoti.LOAD_NOTIFICATION_FAIL):
            return {
                ...state,
                loaded: true,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case (fromNoti.LOAD_NOTIFICATION_SUCCESS):
            return {
                ...state,
                loading: false,
                loaded: true,
                notificaciones: action.servicios
            };
        default:
            return state;
    }
}
