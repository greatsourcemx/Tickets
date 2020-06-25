import { Usuario } from './usuario.model';
import { Tipo } from './tipo.model';
import { Servicio } from './servicio.model';
import { Tecnologia } from './tecnologia.model';


export class Proyecto {
    constructor (
        public Titulo: string = '',
        public Descripcion: string = '',
        public Estado?: string,
        public id: number = 0,
        public AsignadoA: Usuario = new Usuario('', ''),
        public Solicitor: Usuario = new Usuario('', ''),
        public TipoServicio:  string = '',
        public BaseDatos:  string = '',
        public RutaCodigo:  string = '',
        public Version:  string = '',
        public MVC:  string = '',
        public IDE:  string = '',
        public Tareas: Servicio[] = [],
        public Tecnologias: string = '',
        public Tipo: string = '',
        public Tecno:   Tecnologia[] = [],
        public Proceso: string="",
        public VersionDes: string=""
    ) { }
}
