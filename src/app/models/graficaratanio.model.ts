import { Usuario } from './usuario.model';
import { GraficaRating } from './graficarating.model';

export class GraficaAnio {
    constructor (
        public usuario: Usuario,
        public anio: number, 
        public graficaratings: GraficaRating[] = [],
    ) { }
}
