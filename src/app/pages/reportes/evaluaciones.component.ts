import { Component, OnInit } from '@angular/core';
import { Listados, Parametros } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import Json from '../../../assets/json/range.json';
import { Rating } from '../../models/rating.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: []
})
export class EvaluacionesComponent implements OnInit {

  ratings: Rating[] = null;
  rangos: Listados[] = [];
  param: Parametros = new Parametros();
  users: Usuario[] = null;

  constructor(public reporteService: ReportesService,
              public adminService: UsuarioService) {
                this.rangos = Json.Rangos;
                this.adminService.esAdmin()
                .subscribe((data: boolean) => {
                  if (data) {
                    this.cargarUsuarios();
                  }
                });
              }

  ngOnInit() {
  }

  cargarUsuarios() {
    this.adminService.cargarUsuaActivos()
    .subscribe((data: Usuario[]) => {
      this.users = data;
      for (const item of this.users) {
        if (item.nombre === 'N/A') {
          item.nombre = 'Todos';
        }
      }
    });
  }

  generar() {
    this.reporteService.obtenerEvaluaciones( this.param )
    .subscribe((data: Rating[]) => {
      this.ratings = data;
    });
  }

  promedio(): number {
    let prom = 0;
    for (const item of this.ratings) {
      prom += item.rating;
    }
    return (prom / this.ratings.length);
  }

}
