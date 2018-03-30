

export class Mantenimiento {
    constructor (
        public EquiId?: string,
        public Periodicidad: number = 0,
        public FecUltMant?: Date,
        public FecInicial?: Date,
        public FecSiguiente?: Date,
        public Activo: boolean = true,
        public TotalRegistros: number = 0,
        public Id: number = 0
    ) { }
}
