import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from '../../../../models/mantenimientos/mantenimiento.model';
import { MantenimientoService } from '../../../../services/mantenimientos/mantenimiento.service';

@Component({
  selector: 'app-mante-vencidos',
  templateUrl: './mante-vencidos.component.html',
  styles: []
})
export class ManteVencidosComponent implements OnInit {

  mantes: Mantenimiento[] = null;
  cargando = false;

  constructor(public manteService: MantenimientoService) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.manteService.cargarVencidos()
    .subscribe((data: Mantenimiento[]) => {
      this.cargando = false;
      this.mantes = data;
    });
  }

}
