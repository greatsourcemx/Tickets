import * as fromServ from '../actions/index';
import { Servicio } from '../../models/servicio.model';

export interface TicketState {
    tickets: Servicio[];
    loaded: boolean;
    loading: boolean;
    error: any;
    filtro: number;
}

const initState: TicketState = {
    tickets: null,
    loaded: false,
    loading: false,
    error: null,
    filtro: 0
};

export function ticketReducer( state = initState, action: fromServ.acciones ): TicketState {
    switch ( action.type ) {
        // SuperAdministradores
        case fromServ.LOAD_SERV:
            return {
                ...state,
                loading: true,
                error: null
            };
        case fromServ.LOAD_SERV_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                tickets: [ ...action.servicios ]
            };
        case fromServ.LOAD_SERV_FAIL:
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
        // Solicitantes
        case fromServ.LOAD_SERV_SOLI:
            return {
                ...state,
                loading: true,
                error: null,
                filtro: action.payload
            };
        case fromServ.LOAD_SERV_SOLI_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                tickets: [ ...action.servicios ]
            };
        case fromServ.LOAD_SERV_SOLI_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
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
