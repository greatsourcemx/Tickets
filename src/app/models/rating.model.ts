import { Usuario } from './usuario.model';
import { Servicio } from './servicio.model';

export class Rating {
    constructor (
        public id: number = 0,
        public rating: number = 0,
        public fecha: Date = new Date(),
        public solicitante: Usuario = new Usuario(),
        public servicio: Servicio = new Servicio(),
        public total: number = 0
    ) { }
}
