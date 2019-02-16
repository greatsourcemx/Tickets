
export class Reporte {
    constructor (
        public Id: number = 0,
        public Folio: string = '',
        public Responsable: string = '',
        public Solicitante: string = '',
        public NoEmpleado: string = '',
        public Empresa: string = '',
        public Eventos: string = '',
        public Descripcion: string = '',
        public Horas: number = 0,
        public Tiempo: string = ''
    ) { }
}
