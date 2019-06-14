import { Contador } from './contador.model';
import { TopSolicitantes } from './topSolicitantes.model';
import { Rating } from '../rating.model';
import { TopHoras } from './topHoras.model';

export class Graficas {
    constructor(
        public contador: Contador = new Contador(),
        public topSolicitantes: TopSolicitantes[] = [],
        public ratings: Rating[] = [],
        public horas: TopHoras[] = []
    ) { }
}
