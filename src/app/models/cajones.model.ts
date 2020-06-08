import { SeccAlmacen } from './seccalmacen.model';
import { AlmacenItems } from './almacenitems.model';


export class Cajon {
    constructor (
        public id: number = 0,
        public AlmEstante: string = '',
        public AlmCajon: string = '',
        public items: AlmacenItems[] = [],
    ) { }
}