import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AvancesService, UsuarioService, TiempoService } from '../../services/service.index';
import { Servicio, Usuario, Tiempo, Avances } from '../../models/models.index';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styles: []
})
export class AvancesComponent implements OnInit {

  servicio: Servicio = new Servicio('', '');
  usuario: Usuario;
  duracion: Tiempo;
  avance: Avances = new Avances('', new Date());
  _fecha: any = { year: 1800, month: 1, day: 1 };

  constructor(
    public _avancesService: AvancesService,
    public activatedRoute: ActivatedRoute,
    public _tiempoService: TiempoService,
    public router: Router,
    public _usuarioService: UsuarioService) {
      activatedRoute.params.subscribe( params => {
        this.usuario = this._usuarioService.usuario;
        let id = params['id'];
        this.cargarAvances( id );
      });
    }

  ngOnInit() {
    this.cargarTiempos();
    let date = new Date();
    this._fecha.year = date.getFullYear();
    this._fecha.month = date.getMonth() + 1;
    this._fecha.day = date.getDate();
  }

  regresar() {
    let url = localStorage.getItem('url');
    this.router.navigate([url]);
  }

  cargarAvances ( id: number ) {
    this._avancesService.cargarAvances( id )
    .subscribe( (resp: Servicio) => {
      this.servicio = resp;
    });
  }

  cargarTiempos () {
    this._tiempoService.cargarTiemposActivos()
    .subscribe( (resp: any) => {
      this.duracion = resp;
    });
  }

  guardarAvance( f: NgForm ) {

    if (! f.valid ) {
      return;
    }

    // Binding fecha
    this.avance.Fecha = new Date(this._fecha.year, this._fecha.month - 1, this._fecha.day);
    this.avance.Responsable = this._usuarioService.usuario;
    this.avance.servId = this.servicio.Id;
    this._avancesService.guardarAvance(this.avance)
    .subscribe( (resp: any) => {
      this.router.navigate(['/principal']);
    });
  }

}
