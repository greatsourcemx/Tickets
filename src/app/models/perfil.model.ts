
export class Perfil {
    constructor(
        public userId: number = 0,
        public noEmpleado: number = 0,
        public nombre: string = '',
        public correo: string = '',
        public clave: string = '',
        public claveNueva: string = '',
        public puesto: string = '',
    ) { }
}
