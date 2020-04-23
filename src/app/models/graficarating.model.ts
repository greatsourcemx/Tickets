import { Empresa } from './empresa.model';

export class GraficaRating {
    constructor (
        public empresa: Empresa,
        public mes: string, 
        public totalservs: number,
        public avrating: number,
        public rating1: number,
        public rating2: number,
        public rating3: number,
        public rating4: number,
        public rating5: number,
    ) { }
}
