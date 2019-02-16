import { GLPIEquipos } from './GLPIEquipos.model';
import { GLPILocacion } from './GLPILocacion.model';
import { GLPIEmpleado } from './GLPIEmpleado.model';

export class DetalleResponsiva {
    constructor (
        public id: number = 0,
        public estatus: number = 3,
        public fechaEntrega: Date = new Date(),
        public fechaRetorno: Date = new Date(),
        public retornado: boolean = false,
        public respId: number = 0,
        public locacion: GLPILocacion = new GLPILocacion(),
        public empleado: GLPIEmpleado = new GLPIEmpleado(),
        public equipo: GLPIEquipos = new GLPIEquipos()
    ) { }
}
