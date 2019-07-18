import { GLPIEquipos } from '../GLPIEquipos.model';
import { Zonas } from './zonas.model';

export class Mantenimiento {
    constructor (
        public id: number = 0,
        public perdiodicidad: number = 0,
        public fechaInicio: Date = new Date(),
        public fechaSiguiente: Date = new Date(),
        public fechaUltMante: Date = new Date(),
        public activo: boolean = false,
        public equipo: GLPIEquipos = new GLPIEquipos(),
        public zona: Zonas = new Zonas(),
        public tipo: string = '',
        public locacion: string = '',
        public usuario: string = ''
    ) { }
}
