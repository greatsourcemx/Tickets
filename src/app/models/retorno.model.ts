import { GLPILocacion } from './GLPILocacion.model';
import { Usuario } from './usuario.model';
import { GLPIEmpleado } from './GLPIEmpleado.model';


export class RetornoEquipo {
    constructor(
        public folio: number = 0,
        public nombre: string = '',
        public tipo: string = '',
        public modelo: string = '',
        public dispositivo: string = '',
        public retornar: boolean = false,
        public locacion: GLPILocacion = new GLPILocacion(),
        public fecEntrega: Date = new Date(),
        public usuario: Usuario = new Usuario(),
        public empleado: GLPIEmpleado = new GLPIEmpleado(),
        public empresa: string = '',
    ) { }
}
