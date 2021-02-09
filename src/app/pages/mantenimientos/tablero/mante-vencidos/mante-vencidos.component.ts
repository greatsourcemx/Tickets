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
  color = '#F7DCDE';

  constructor(public manteService: MantenimientoService) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    debugger;
    this.cargando = true;
    this.manteService.cargarVencidos()
    .subscribe((data: any) => {
      this.cargando = false; 
      for(let i = 0; i < data.length; i++){
        console.log(i);
        if(data[i].equipo == null){
          data[i] = data[i+1];
        }

        this.mantes = data;
      } 
    });
  }

}
