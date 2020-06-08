import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  templateUrl: './tipoticket.component.html',
  styles: []
})
export class TipoTicketComponent implements OnInit {

  cargando: boolean = false;
  query = '';


  constructor( public _solicitanteService: SolicitanteService ) { }

  ngOnInit() {
  }

 

}
