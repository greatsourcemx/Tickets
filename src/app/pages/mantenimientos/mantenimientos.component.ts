import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../services/service.index';
import { Mantenimiento } from '../../models/mantenimientos/mantenimiento.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styles: []
})
export class MantenimientosComponent implements OnInit {

  cargando: boolean = false;
  mantes: Mantenimiento[] = null;

  constructor(public _manteServices: MantenimientoService ) { }

  ngOnInit() {
    this.cargarMantes();
  }

  cargarMantes () {
    this.cargando = true;
    this._manteServices.cargarMantenimientos()
    .subscribe( (resp: any) => {
      this.cargando = false;
      this.mantes = resp;
    });
  }

}
