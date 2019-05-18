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
  ratings: Rating[] = [];
  evaluaciones: Servicio[] = null;

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
        for ( let serv of this.evaluaciones) {
          this.ratings.push( new Rating(0, null, new Date(), null, serv));
        }
        this.modalService.open(this.content);
      }
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  save() {
    if ( this.ratings.filter( r => r.rating > 0).length > 0 ) {
      this._serviciosService.guardarEvaluacion( this.ratings )
      .subscribe(() => {
        swal('Evaluación enviada', '', 'success');
        this.modalService.dismissAll('close');
      });
    } else {
      const leyenda = this.ratings.length > 1 ? 'Debe calificar al menos una evaluación' : 'Debe calificar la evaluación';
      swal(leyenda, '', 'warning');
    }
  }

}
