import { Usuario } from './usuario.model';
import { Prioridad } from './Prioridad.model';
import { Avances } from './avances.model';
import { Tiempo } from './tiempo.model';
import { Tipo } from './tipo.model';
import { Archivos } from './archivos.model';


export class Servicio {
    constructor (
        public Titulo: string = '',
        public Descripcion: string = '',
        public leido: boolean = false,
        public Estado?: string,
        public Id: number = 0,
        public FecRegistro?: Date,
        public FecCerrado?: Date,
        public FecCompromiso?: Date,
        public FecActualizado?: Date,
        public AsignadoA: Usuario = new Usuario('', ''),
        public Solicitor: Usuario = new Usuario('', ''),
        public Urgencia: Prioridad = new Prioridad(''),
        public TiempoTranscurrido?: string,
        public avances?: Avances,
        public Duracion: Tiempo = new Tiempo(),
        public Solucion: string = '',
        public TipoServicio: Tipo = new Tipo(''),
        public tiempoTotal: string = 'Sin Avances',
        public desde: number = 0,
        public Total: number = 0,
        public termino: string = '',
        public archivos: Archivos[] = [],
        public proyecto: number = 0
    ) { }
}
