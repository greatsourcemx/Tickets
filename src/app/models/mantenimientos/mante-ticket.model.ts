import { Tiempo } from '../tiempo.model';
import { Servicio } from '../servicio.model';
import { Mantenimiento } from './mantenimiento.model';

export class TicketMante {
    constructor (
        public id: number = 0,
        public fecMante: Date = new Date(),
        public ticket: Servicio = new Servicio(),
        public mante: Mantenimiento = new Mantenimiento(),
        public fecCerrado: any = { }
    ) { }
}
