import { Usuario } from './usuario.model';
import { Prioridad } from './Prioridad.model';
import { Avances } from './avances.model';
import { Tiempo } from './tiempo.model';
import { Tipo } from './tipo.model';


export class Servicio {
    constructor (
        public Titulo: string,
        public Descripcion: string = '',
        public Estatus?: string,
        public Id: number = 0,
        public FecRegistro?: Date,
        public FecCerrado?: Date,
        public AsignadoA: Usuario = new Usuario('', ''),
        public Solicitor: Usuario = new Usuario('', ''),
        public Urgencia: Prioridad = new Prioridad(''),
        public TiempoTranscurrido?: string,
        public avances?: Avances,
        public Duracion?: Tiempo,
        public Solucion: string = '',
        public TipoServicio: Tipo = new Tipo(''),
        public tiempoTotal: string = 'Sin Avances',
        public desde: number = 0
    ) { }
}
