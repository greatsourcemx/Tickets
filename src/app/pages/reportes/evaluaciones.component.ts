import { Component, OnInit } from '@angular/core';
import { Listados, Parametros } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import Json from '../../../assets/json/range.json';
import { Rating } from '../../models/rating.model';
import { Usuario } from '../../models/usuario.model';
import { EmpresasService } from '../../services/empresas/empresas.service';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: []
})
export class EvaluacionesComponent implements OnInit {

  ratings: Rating[] = null;
  rangos: Listados[] = [];
  empresas: Empresa[] = null;
  param: Parametros = new Parametros();
  users: Usuario[] = null;

  constructor(public reporteService: ReportesService,
              public empresaData: EmpresasService,
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
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaData.cargarEmpresasActivas()
    .subscribe((data: Empresa[]) => {
      this.empresas = data;
    });
  }

  cargarUsuarios() {
    this.adminService.cargarUsuaActivos()
    .subscribe((data: Usuario[]) => {
      this.users = data;
      for (const item of this.users) {
        if (item.nombre === 'TODOS') {
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
