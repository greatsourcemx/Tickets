import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../../services/mantenimientos/mantenimiento.service';
import { Mantenimiento } from '../../../../models/mantenimientos/mantenimiento.model';

@Component({
  selector: 'app-ultimos-mante',
  templateUrl: './ultimos-mante.component.html',
  styles: []
})
export class UltimosManteComponent implements OnInit {

  mantes: Mantenimiento[] = null;
  cargando = false;
  cuantos = 10;

  constructor(public manteServices: MantenimientoService) { }

  ngOnInit() {
    this.cargarMante();
  }

  cargarMante() {
    this.cargando = true;
    this.manteServices.cargarUltimos( this.cuantos )
    .subscribe((data: Mantenimiento[]) => {
      this.cargando = false;
      this.mantes = data;
    });
  }

}
