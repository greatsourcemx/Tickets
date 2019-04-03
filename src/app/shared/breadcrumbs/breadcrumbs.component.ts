import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SolicitanteService, TiempoService, ServiciosService } from '../../services/service.index';
import { Usuario, Tiempo, Servicio } from '../../models/models.index';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';
  ticket: Servicio = new Servicio('', '');
  users: Usuario[];
  duracion: Tiempo[];

  constructor(private router: Router,
              public title: Title,
              public _tiempoService: TiempoService,
              public _soliService: SolicitanteService,
              public _servicioService: ServiciosService,
              public meta: Meta) {
                this.getDataRoute()
                .subscribe( data => {
                  this.label = data.titulo;
                  this.title.setTitle( this.label );
                  let metaTag: MetaDefinition = {
                    name: 'description',
                    content: this.label
                  };
                  this.meta.updateTag(metaTag);
                });
  }

  getDataRoute() {
    return this.router.events
        .filter( evento => evento instanceof ActivationEnd  )
        .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
        .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

  ngOnInit() {
    this.cargarSolicitante();
    this.cargarTiempos();
  }

  cargarSolicitante( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTiempos() {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
      this.ticket.Duracion = this.duracion[0];
    });
  }

  guardar( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    if ( this.ticket.Solicitor.id === 0 ) {
      swal('Advertencia', 'Debe seleccionar el solicitor', 'warning');
      return;
    }
    this._servicioService.guardaTicketRapido( this.ticket )
    .subscribe((resp: any) => {
      this.ticket = new Servicio('', '');
      this.ticket.Duracion = this.duracion[0];
      swal('Correcto!', 'Se registró el servicio', 'success');
    }, error => {
      swal('Aviso!', error.error, 'warning');
    });
  }

}
