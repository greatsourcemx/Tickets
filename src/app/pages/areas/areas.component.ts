import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
import { Areas } from '../../models/areas.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styles: []
})
export class AreasComponent implements OnInit {

  cargando: boolean = false;
  Areas: Areas[] = [];
  query = '';


  constructor( public _solicitanteService: SolicitanteService ) { }

  ngOnInit() {
    this.cargarAreas();
  }

  cargarAreas () {
    this.cargando = true;

    this._solicitanteService.cargarAreas()
    .subscribe( (resp: Areas[]) => {
       debugger; 
      this.Areas = resp;
      this.cargando = false;
    });
  }
  modificarArea (area: Areas) {
    area.descripcion = area.descripcion.toUpperCase()
    this._solicitanteService.modificarEmpresa(area).subscribe();

  }

  crearArea() {
    swal.fire({
      title: 'Crear Area laboral',
      text: 'Ingrese el nombre',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        let area: Areas = new Areas(result.value.toUpperCase());
        this._solicitanteService.guardararea( area )
        .subscribe( () => {
          this.cargarAreas();
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
      }
    });
  }

}
