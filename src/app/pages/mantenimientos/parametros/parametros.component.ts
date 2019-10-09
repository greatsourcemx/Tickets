import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../../../services/service.index';
import { ParametrosMant } from '../../../models/mantenimientos/mantenimiento.index';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styles: []
})
export class ParametrosComponent implements OnInit {

  param: ParametrosMant = new ParametrosMant();

  constructor(public paramService: ParametrosService) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.paramService.cargarParametros()
    .subscribe((data: ParametrosMant) => {
      this.param = data;
    });
  }

  guardar() {
    this.paramService.guardar( this.param )
    .subscribe(() => { });
  }

}
