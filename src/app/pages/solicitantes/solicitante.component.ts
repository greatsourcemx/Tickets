import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { SolicitanteService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styles: []
})
export class SolicitanteComponent implements OnInit {

  solicitante: Usuario = new Usuario('', '', '', '');

  constructor( public _solicitanteService: SolicitanteService,
    public router: Router) { }

  ngOnInit() {
    this.solicitante.actualizarPassword = true;
  }

  guardarSolicitante( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._solicitanteService.guardarSolicitante( this.solicitante )
            .subscribe( soli => {
              this.solicitante.id = soli.id;
              this.router.navigate(['/solicitantes']);
            },
            error => {
              swal('Aviso!', error.error, 'warning');
            });

  }

}
