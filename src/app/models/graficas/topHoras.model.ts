import { Usuario } from '../usuario.model';

export class TopHoras {
    constructor(
        public total: number = 0,
        public minutos: number = 0,
        public horas: number = 0,
        public tiempo: string = '',
        public solicitante: Usuario = new Usuario(),
    ) { }
}
