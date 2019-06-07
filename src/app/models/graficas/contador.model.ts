
export class Contador {
    constructor(
        public tiempo: number = 0,
        public tiempoInvertido: string = '',
        public cerrados: number = 0,
        public proceso: number = 0,
        public abiertas: number = 0,
        public rango: string = ''
    ) { }
}
