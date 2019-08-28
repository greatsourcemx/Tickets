import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TiempoPipe } from './tiempo.pipe';
import { GroupByPipe } from './group-by.pipe';
import { HorasPipe } from './horas.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { TruncatePipe } from './truncate.pipe';
import { CapitalizarPipe } from './capitalizar.pipe';
import { FechaPipe } from './fecha.pipe';

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
    CapitalizarPipe,
    FechaPipe
  ],
  exports: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe,
    OrderbyPipe,
    TruncatePipe,
    CapitalizarPipe,
    FechaPipe
  ]
})
export class PipesModule { }
