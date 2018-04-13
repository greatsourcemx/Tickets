import { Servicio } from './servicio.model';


export class Principal {
    constructor (
        public abiertos: number = 0,
        public proceso: number = 0,
        public cerrados: number = 0,
        public tiempoInvertido: string = '',
        public servicios: Servicio[] = []
    ) { }
}
