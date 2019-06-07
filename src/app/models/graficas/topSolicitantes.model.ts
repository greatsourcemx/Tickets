import { Usuario } from '../usuario.model';

export class TopSolicitantes {
    constructor (
        public solicitante: Usuario = new Usuario(),
        public total: number = 0,
        public porcentaje: number = 0
    ) { }
}
