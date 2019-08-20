import { Component, OnInit } from '@angular/core';
import { RecurrentesService } from '../../services/servicios/recurrentes.service';
import { Recurrentes } from '../../models/recurrentes.model';
import swal from 'sweetalert2';



@Component({
  selector: 'app-recurrentes',
  templateUrl: './recurrentes.component.html',
  styles: []
})
export class RecurrentesComponent implements OnInit {

  recurrentes: Recurrentes[] = [];
  cargando = false;

  constructor(public recuService: RecurrentesService) { }

  ngOnInit() {
    this.cargarRecurrentes();
  }

  cargarRecurrentes() {
    this.cargando = true;
    this.recuService.cargarRecurrentes()
    .subscribe((data: Recurrentes[]) => {
      this.cargando = false;
      this.recurrentes = data;
    });
  }

  modificar( recurrente: Recurrentes ) {
    this.recuService.modificarRecurrente( recurrente )
    .subscribe((data: any) => { swal.fire('Actualizado', 'Se actualizó correctamente', 'success'); });
  }

}
