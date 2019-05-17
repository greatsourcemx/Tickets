import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { ServiciosService } from '../../services/service.index';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from '../../models/rating.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent implements OnInit {

  @ViewChild('content') content: any;
  currentRate: any;
  evaluaciones: Servicio[] = null;
  rating: Rating = new Rating();

  constructor(public _serviciosService: ServiciosService,
              public config: NgbModalConfig,
              private modalService: NgbModal) {
                this.config.backdrop = 'static';
                this.config.keyboard = false;
              }

  ngOnInit() {
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones() {
    this._serviciosService.cargarSinEvaluaciones()
    .subscribe((resp: Servicio[]) => {
      this.evaluaciones = resp;
      if (this.evaluaciones.length > 0) {
        this.modalService.open(this.content);
      }
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  save( evaluacion: Servicio ) {
    this.rating.rating = this.currentRate;
    this.rating.servicio = evaluacion;
    this._serviciosService.guardarEvaluacion( this.rating )
    .subscribe(() => {
      swal('Evaluación enviada', '', 'success');
      this.modalService.dismissAll('close');
    });
  }

}
