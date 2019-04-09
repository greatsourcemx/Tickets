import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recurrentes } from '../../models/recurrentes.model';
import { RecurrentesService, SolicitanteService, UsuarioService, TiposService } from '../../services/service.index';
import { Usuario, Tipo } from '../../models/models.index';
import * as dias from '../../config/dias.json';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-recurrente',
  templateUrl: './edit-recurrente.component.html',
  styles: []
})
export class EditRecurrenteComponent implements OnInit {

  recurrente: Recurrentes = new Recurrentes();
  solicitantes: Usuario[] = [];
  responsables: Usuario[] = [];
  tipos: Tipo[] = [];
  dias: any[] = dias.default;
  fecha: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  fechaFin: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1 };
  minfecha: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  cargando = false;

  constructor(public recuService: RecurrentesService,
              public usuarioService: UsuarioService,
              public soliService: SolicitanteService,
              public tipoServ: TiposService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
                activatedRoute.params.subscribe( params => {
                  let id = params['id'];
                  this.cargarDetalles( id );
                });
              }

  ngOnInit() {
    this.cargarSolicitante();
    this.cargarResponsables();
    this.cargarTipos();
  }

  cargarDetalles( id: number ) {
    this.cargando = true;
    this.recuService.cargarRecurrente( id )
    .subscribe((data: Recurrentes) => {
      this.cargando = true;
      this.recurrente = data;
      this.cargarDiaSemana();
    });
  }

  cargarSolicitante() {
    this.cargando = true;
    this.soliService.cargarSoliActivos()
    .subscribe((data: Usuario[]) => {
      this.cargando = false;
      this.solicitantes = data;
    });
  }

  cargarResponsables() {
    this.cargando = true;
    this.usuarioService.cargarUsuaActivos()
    .subscribe((data: Usuario[]) => {
      this.cargando = false;
      this.responsables = data;
    });
  }

  cargarTipos() {
    this.cargando = true;
    this.tipoServ.cargarTiposActivos()
    .subscribe((data: Tipo[]) => {
      this.cargando = false;
      this.tipos = data;
      this.recurrente.tipoServicio = this.tipos[0];
    });
  }

  cargarDiaSemana( ) {
    for ( let dia of this.dias) {
      if ( this.recurrente.dias.indexOf( dia.valor ) > -1 ) {
        dia.seleccionado = true;
      } else {
        dia.seleccionado = false;
      }
    }
  }

  selDia( event: any, dia: any ) {
    dia.seleccionado = event.currentTarget.checked;
  }

  modificar() {
    if (!this.validaciones()) {
      return;
    }
    this.recurrente.dias = '';
    for ( let d of this.dias ) {
      if ( d.seleccionado ) {
        this.recurrente.dias += d.valor + ',';
      }
    }
    this.recurrente.fecInicio = new Date(this.fecha.year, this.fecha.month - 1, this.fecha.day);
    if (this.recurrente.finaliza) {
      this.recurrente.fecFinal = new Date(this.fechaFin.year, this.fechaFin.month - 1, this.fechaFin.day);
    } else {
      this.recurrente.fecFinal = new Date(1800, 1, 1);
    }
    this.cargando = true;
    this.recuService.actualizarRecurrente( this.recurrente )
    .subscribe((data: Recurrentes) => {
      this.cargando = false;
      this.recurrente = data;
      swal('Correcto', 'Se guardó el servicio recurrente', 'success');
      this.router.navigate(['/recurrentes']);
    });
  }

  validaciones(): boolean {
    if ( this.recurrente.solicitante.id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el solicitante', 'warning');
      return false;
    }
    if ( this.recurrente.solicitante.id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el responsable', 'warning');
      return false;
    }
    return true;
  }

}
