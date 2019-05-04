
import { ServiciosEffects } from './tickets.effects';
import { MarcadoresEffects } from './marcador.effects';
import { SolicitantesEffects } from './solicitante.effects';
import { TiempoEffects } from './tiempo.effects';

export const effectsArr: any[] = [ ServiciosEffects,
                                MarcadoresEffects,
                                TiempoEffects,
                                SolicitantesEffects ];

export * from './tickets.effects';
export * from './marcador.effects';
export * from './solicitante.effects';
export * from './tiempo.effects';
