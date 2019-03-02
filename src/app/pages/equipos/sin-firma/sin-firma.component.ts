import { Component, OnInit } from '@angular/core';
import { GlpiService } from '../../../services/GLPI/glpi.service';
import { Responsiva } from '../../../models/responsiva.model';

@Component({
  selector: 'app-sin-firma',
  templateUrl: './sin-firma.component.html',
  styles: []
})
export class SinFirmaComponent implements OnInit {

  empresa = 'EBR';
  responsivas: Responsiva[] = [];
  cargando = false;
  firmarTodos = false;
  verBoton = false;

  constructor(public glpiService: GlpiService) { }

  ngOnInit() {
    this.cargarResponsivas();
  }

  seleccionEmpresa( empresa: string ) {
    this.empresa = empresa;
    this.cargarResponsivas();
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.cargarResponsivas();
    }
  }

  cargarResponsivas() {
    this.cargando = true;
    this.glpiService.cargarResponsivasSinFirma( this.empresa )
    .subscribe((data: Responsiva[]) => {
      this.cargando = false;
      this.firmarTodos = false;
      this.verBoton = false;
      this.responsivas = data;
    });
  }

  Todos() {
    for ( const entr of this.responsivas ) {
      entr.firmado = this.firmarTodos;
    }
    this.verBotones();
  }

  verBotones() {
    this.verBoton = false;
    for ( const entr of this.responsivas ) {
      if ( entr.firmado ) {
        this.verBoton = true;
      }
    }
  }

  firmados() {
    this.cargando = true;
    this.glpiService.guardarFirmas( this.responsivas )
    .subscribe((data: Responsiva[]) => {
      this.cargando = false;
      this.firmarTodos = false;
      this.verBoton = false;
      this.responsivas = data;
    });
  }

  verPDF( folio: number ) {
    this.cargando = true;
    this.glpiService.verPDFFolio( folio, this.empresa )
    .subscribe((data: any) => {
      this.cargando = false;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });
  }

}
