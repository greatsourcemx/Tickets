import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TiempoPipe } from './tiempo.pipe';
import { GroupByPipe } from './group-by.pipe';
import { HorasPipe } from './horas.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe,
    OrderbyPipe,
    TruncatePipe
  ],
  exports: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe,
    OrderbyPipe,
    TruncatePipe
  ]
})
export class PipesModule { }
