import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TiempoPipe } from './tiempo.pipe';
import { GroupByPipe } from './group-by.pipe';
import { HorasPipe } from './horas.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { TruncatePipe } from './truncate.pipe';
import { CapitalizarPipe } from './capitalizar.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe,
    OrderbyPipe,
    TruncatePipe,
    CapitalizarPipe
  ],
  exports: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe,
    OrderbyPipe,
    TruncatePipe,
    CapitalizarPipe
  ]
})
export class PipesModule { }
