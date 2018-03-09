import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-solicitante',
  templateUrl: './editar-solicitante.component.html',
  styles: []
})
export class EditarSolicitanteComponent implements OnInit {

  solicitante: Usuario = new Usuario('', '', '', '');

  constructor(public activatedRoute: ActivatedRoute,
    public _solicitanteService: SolicitanteService,
    public router: Router ) {
      activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.cargarSolicitante( id );

      });
  }

  ngOnInit() {
  }

  cargarSolicitante( id: number ) {
    this._solicitanteService.cargarSolici( id )
          .subscribe( soli => {
            this.solicitante = soli;
          });
  }

  guardar ( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._solicitanteService.modificarSolicitante( this.solicitante )
        .subscribe( usuario => {
          this.router.navigate(['/solicitantes']);
        },
        error => {
          swal('Aviso!', error.error, 'warning');
        });

  }

}
