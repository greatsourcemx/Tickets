import { Component, OnInit } from '@angular/core';
import { ZonasService } from '../../../services/service.index';
import { Zonas } from '../../../models/mantenimientos/zonas.model';
declare var swal: any;

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styles: []
})
export class ZonasComponent implements OnInit {

  cargando = false;
  zonas: Zonas[] = null;

  constructor(public zonaService: ZonasService) { }

  ngOnInit() {
    this.cargarZonas();
  }

  cargarZonas() {
    this.cargando = true;
    this.zonaService.cargarZonas()
    .subscribe((data: Zonas[]) => {
      this.cargando = false;
      this.zonas = data;
    });
  }

  modificar( zona: Zonas ) {
    this.zonaService.modificar( zona )
    .subscribe(() => {  });
  }

  crearZona() {
    swal({
      title: 'Crear Zona',
      text: 'Ingrese el nombre',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {
      if ( !valor ) {
        return;
      }
      const zona: Zonas = new Zonas(0, valor, true);
      this.zonaService.guardar( zona )
              .subscribe( () => {
                this.cargarZonas();
              },
              error => {
                swal('Aviso!', error.error, 'warning');
              });
    });
  }

  buscar( termino: string ) {
  }

}
