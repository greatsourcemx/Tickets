import { DetalleResponsiva } from './detalleResponsiva.model';
import { GLPILocacion } from './GLPILocacion.model';
import { GLPIEmpleado } from './GLPIEmpleado.model';

export class Responsiva {
    constructor (
        public id: number = 0,
        public notas: string = '',
        public firmado: boolean = false,
        public fechaEntrega: Date = new Date(),
        public folio: string = '',
        public empleado: GLPIEmpleado = new GLPIEmpleado(),
        public locacion: GLPILocacion = new GLPILocacion(),
        public detalle: DetalleResponsiva[] = []
    ) { }
}
