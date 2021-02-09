import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { ServiciosService } from '../../services/service.index';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from '../../models/rating.model';
import swal from 'sweetalert2';

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
              public configRating: NgbRatingConfig,
              private modalService: NgbModal) {
                configRating.readonly = false;
                configRating.max = 5;
              }

  ngOnInit() {
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones() {
    debugger;
    this._serviciosService.cargarSinEvaluaciones()
    .subscribe((resp: Servicio[]) => {
      this.evaluaciones = resp;
      if (this.evaluaciones.length > 0) {
        for ( let serv of this.evaluaciones) {
          this.ratings.push( new Rating(0, null, new Date(), null, serv));
        }
        this.modalService.open(this.content, { size: 'lg', keyboard: false, backdrop: 'static' });
      }
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', keyboard: false, backdrop: 'static' });
  }

  save() {
    if ( this.ratings.filter( r => r.rating > 0).length > 0 ) {
      this._serviciosService.guardarEvaluacion( this.ratings )
      .subscribe(() => {
        swal.fire('Evaluación enviada', '', 'success');
        this.modalService.dismissAll('close');
      });
    } else {
      const leyenda = this.ratings.length > 1 ? 'Debe calificar al menos una evaluación' : 'Debe calificar la evaluación';
      swal.fire(leyenda, '', 'warning');
    }
  }

  cambio( rate: number, rating: Rating ) {
    if (rate !== 0 && rate <= 3) {
      rating.mostrarComentario = true;
    } else if ( rate !== 0 && rate >= 4 ) {
      rating.mostrarComentario = false;
    }
  }

}
