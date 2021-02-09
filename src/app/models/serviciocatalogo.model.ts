import { Archivos } from './archivos.model';
import { Archivoscatalogo } from './archivoscatalogo.model';
import { Usuario } from './usuario.model';

export class ServicioCatalogo {
    constructor (
        public id: number = 0,
        public Nombre: string = '',
        public Descripcion: string = '',
        public NombreProveedor: string = '',
        public CuentaProve: string = '',
        public CorreoProve: string = '',
        public TelefonoProve: string = '',
        public WebProve: string = '',
        public Asesor: string = '',
        public Recordar: number = 0,
        public Estatus: number = 0,
        public FechaCreado: Date,
        
        public FechaVencimiento: Date,
        public Fecha: Date, 
        public archivos: Archivoscatalogo[] = [],
        public usuario: Usuario = new Usuario(),
        public Adicionales: string = '',



    ) { }
}
