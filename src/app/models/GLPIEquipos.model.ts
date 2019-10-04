import { Mantenimiento } from './mantenimientos/mantenimiento.model';
import { Tiempo } from './tiempo.model';

export class GLPIEquipos {
    constructor (
        public Id: number = 0,
        public Nombre: string = '',
        public Tipo: string = '',
        public Descripcion: string = '',
        public Modelo: string = '',
        public Serie: string = '',
        public SistemaOperativo: string = '',
        public Procesador: string = '',
        public Ram: string = '',
        public DiscoDuro: string = '',
        public mantenimiento: Mantenimiento = null,
        public recalcularMto: boolean = false,
        public duracion: Tiempo = new Tiempo()
    ) { }
}
