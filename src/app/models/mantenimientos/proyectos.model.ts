import { Usuario } from '../usuario.model';

export class Proyectos {
    constructor (
        public proyectoid: number = 0,
        public desarrollo: string = '',
        public nombre: string = '',
        public versionvb: string = '',
        public mvc: string = '',
        public tecnologias: string = '',
        public estatus: string = '',
        public ubicacion: string = '',
        public AsignadoA: Usuario = new Usuario('', ''),
        public Solicitor: Usuario = new Usuario('', ''),        
        public bd: string = '',
        public aux1: string = '',
        public aux2: string = '',
        public aux3: string = '',
        public aux4: string = '',
        public avanceid: number = 0,
        public avancedesid: number = 0,
        public avancedesc: string = '',
        public avanceestado: string = '',
        public avancefecha: string = '' 
    ) { }
}
