import { Usuario } from './usuario.model';
import { Tipo } from './tipo.model';
import { Servicio } from './servicio.model';

export class Proyecto {
    constructor (
        public Titulo: string = '',
        public Descripcion: string = '',
        public Estado?: string,
        public id: number = 0,
        public AsignadoA: Usuario = new Usuario('', ''),
        public Solicitor: Usuario = new Usuario('', ''),
        public TipoServicio:  string = '',
        public Tecnologias:   string = '',
        public Basedatos:  string = '',
        public Rutacodigo:  string = '',
        public Version:  string = '',
        public MVC:  string = '',
        public IDE:  string = '',
        public Tareas: Servicio[] = []
    ) { }
}
