import { Usuario } from './usuario.model';
import { Tipo } from './tipo.model';

export class Recurrentes {
    constructor(
        public id: number = 0,
        public titulo: string = '',
        public descripcion: string = '',
        public tipoServicio: Tipo = new Tipo(),
        public recurrencia: number = 1,
        public frecuencia: string = 'Diario',
        public dias: string = '',
        public mes: string = '1',
        public fecInicio: Date = new Date(),
        public fecFinal: Date = new Date(),
        public finaliza: boolean = false,
        public fecSiguiente: Date = new Date(),
        public activo: boolean = true,
        public responsable: Usuario = new Usuario(),
        public solicitante: Usuario = new Usuario(),
    ) { }
}
