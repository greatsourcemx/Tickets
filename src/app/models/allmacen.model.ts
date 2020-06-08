import { Cajon } from './cajones.model';
import { SeccAlmacen } from './seccalmacen.model';

export class Allmacen {
    constructor (
        public seccion: SeccAlmacen = new SeccAlmacen(),
        public cajones: Cajon[] = [],

    ) { }
}