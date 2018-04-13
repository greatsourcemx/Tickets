import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TiempoPipe } from './tiempo.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    TiempoPipe
  ],
  exports: [
    ImagenPipe,
    TiempoPipe
  ]
})
export class PipesModule { }
