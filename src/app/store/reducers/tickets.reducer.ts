import * as fromServ from '../actions/index';
import { Servicio } from '../../models/servicio.model';
// import { AppState } from '../app.reducers';

export interface TicketState {
    tickets: Servicio[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

// export interface TicketAppState extends AppState {
//     servicios: TicketState;
// }

const initState: TicketState = {
    tickets: null,
    loaded: false,
    loading: false,
    error: null
};

export function ticketReducer( state = initState, action: fromServ.acciones ): TicketState {
    switch ( action.type ) {
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
        default:
            return state;
    }
}
