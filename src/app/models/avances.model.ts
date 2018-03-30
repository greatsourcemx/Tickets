import { Usuario } from './usuario.model';
import { Tiempo } from './tiempo.model';

export class Avances {
    constructor (
        public Comentario: string,
        public Fecha?: Date,
        public Duracion?: Tiempo,
        public Responsable?: Usuario,
        public Id: number = 0
    ) { }
}
