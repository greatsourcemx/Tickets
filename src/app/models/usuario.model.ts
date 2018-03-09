

export class Usuario {
    constructor (
        public correo: string,
        public password: string,
        public nombre?: string,
        public usuario?: string,
        public noEmpleado: number = 0,
        public id: number = 0,
        public rol?: string,
        public estado?: string,
        public actualizarPassword: boolean = false,
        public totalUsuarios: number = 0,
    ) { }
}
