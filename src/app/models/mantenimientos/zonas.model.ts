import { Mantenimiento } from './mantenimiento.model';

export class Zonas {
    constructor (
        public id: number = 0,
        public nombre: string = '',
        public activo: boolean = false,
        public equipos: Mantenimiento[] = null
    ) { }
}
