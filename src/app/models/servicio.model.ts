import { Usuario } from './usuario.model';
import { Prioridad } from './Prioridad.model';
import { Avances } from './avances.model';


export class Servicio {
    constructor (
        public Titulo: string,
        public Descripcion?: string,
        public Estatus?: string,
        public Id: number = 0,
        public FecRegistro?: Date,
        public FecCerrado?: Date,
        public AsignadoA?: Usuario,
        public Solicitor?: Usuario,
        public Urgencia: Prioridad = new Prioridad(''),
        public TiempoTranscurrido?: string,
        public avances?: Avances
    ) { }
}
