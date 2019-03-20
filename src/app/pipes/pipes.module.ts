import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TiempoPipe } from './tiempo.pipe';
import { GroupByPipe } from './group-by.pipe';
import { HorasPipe } from './horas.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe
  ],
  exports: [
    ImagenPipe,
    TiempoPipe,
    GroupByPipe,
    HorasPipe,
    FilterPipe
  ]
})
export class PipesModule { }
