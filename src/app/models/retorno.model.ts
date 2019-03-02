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
        /* Transferencia de Equipo */
        public transferir: boolean = false,
        public transEmpleado: GLPIEmpleado = new GLPIEmpleado(),
        public transLocacion: GLPILocacion = new GLPILocacion(),
        public transFirmado: boolean = false,
        public transNotas: string = '',
        public descripcion: string = '',
        public serie: string = '',
        public sistemaOperativo: string = '',
        public procesador: string = '',
        public ram: string = '',
        public discoDuro: string = ''
    ) { }
}
