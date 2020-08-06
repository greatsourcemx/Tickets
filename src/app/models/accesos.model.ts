import { Usuario } from './usuario.model';  
export class Accesos {
    constructor (
        public User: Usuario = new Usuario('', ''),
        public Empresas: string = '', 
        public IMA: boolean = false,
        public EBR: boolean = false,
    ) { }
}
