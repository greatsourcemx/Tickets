import { Usuario } from './usuario.model';

export class PorcentajeUser {
    constructor (
        public usuario: Usuario ,
        public Empresa: string = '',
        public HorasIMA: number = 0,
        public HorasEBR: number = 0,
        public HorasRS: number = 0,
        public horas: number = 0,
    ) { }
}
