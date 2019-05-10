import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './reducers/ui.reducers';
import * as fromAuth from './reducers/auth.reducer';
import * as reducers from './reducers';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    servicios: reducers.TicketState;
    marcadores: reducers.MarkerState;
    solicitantes: reducers.SoliState;
    tiempos: reducers.TiempoState;
    notificacion: reducers.NotifiState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducers,
    auth: fromAuth.authReducer,
    servicios: reducers.ticketReducer,
    marcadores: reducers.marcadorReducer,
    solicitantes: reducers.solicitantesReducer,
    tiempos: reducers.tiempoReducer,
    notificacion: reducers.notificacionReducer
};
