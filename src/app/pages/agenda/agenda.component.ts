import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../services/service.index';
import { Mantenimiento } from '../../models/mantenimientos/mantenimiento.model';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: []
})
export class AgendaComponent implements OnInit {

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

  inactivarMante( mante: Mantenimiento, index: number ) {
    this.cargando = true;
    this._manteServices.inactivaMante( mante )
    .subscribe(() => {
      this.mantes.slice( index, 1 );
      this.cargando = false;
    });
  }

}
