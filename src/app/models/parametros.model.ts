import { Usuario } from './usuario.model';

export class Parametros {
    constructor (
        public fechaInicial: Date = new Date(),
        public fechaFinal: Date = new Date(),
        public responsable: Usuario = new Usuario('', '')
    ) { }
}
