import { Component, OnInit } from '@angular/core';
import { Listados, Parametros } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import Json from '../../../assets/json/range.json';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: []
})
export class EvaluacionesComponent implements OnInit {

  ratings: Rating[] = null;
  rangos: Listados[] = [];
  param: Parametros = new Parametros();

  constructor(public reporteService: ReportesService,
              public adminService: UsuarioService) {
                this.rangos = Json.Rangos;
              }

  ngOnInit() {
  }

  generar() {
    this.reporteService.obtenerEvaluaciones( this.param )
    .subscribe((data: Rating[]) => {
      this.ratings = data;
    });
  }

}
