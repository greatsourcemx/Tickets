import { Component, OnInit } from '@angular/core';
import { MantenimientoService, ProyectosService } from '../../../services/service.index';
import { Proyecto } from '../../../models/proyecto.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-proyectogen',
  templateUrl: './proyectogen.component.html',
  styles: [],
  styleUrls: ['../../agenda/agenda.component.css', '../../principal/iconos.component.css']
})

export class ProyectoGenComponent implements OnInit {
    cargando: boolean = false;
    proyes: Proyecto[] = null;
    isDesc: boolean = false;
    column: string = 'CategoryName';
    direction: number;
    query = '';

    constructor(public _manteServices: MantenimientoService,
      public _ProyectoService: ProyectosService,) {

    }

    ngOnInit() {
        this.cargarDesarrollos();
    }


    sort(property) {
      this.isDesc = !this.isDesc; // change the direction
      this.column = property;
      this.direction = this.isDesc ? 1 : -1;
    }
    cargarDesarrollos () {
        this.cargando = true;
        this._ProyectoService.cargarProyectosGen()
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.proyes = resp;
        });
    }
}
