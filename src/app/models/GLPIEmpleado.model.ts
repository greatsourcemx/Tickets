

export class GLPIEmpleado {
    constructor (
        public Id: number = 0,
        public Descripcion: string = '',
        public Nombre: string = '',
        public Comentario: string = '',
        public Correo: string = '',
        public NoEmpleado: number = 0,
        public Activo: boolean = false,
        public Estatus: string = '',
        public UUID: string = '',
        public GRUPO: string = ''
    ) { }
}
