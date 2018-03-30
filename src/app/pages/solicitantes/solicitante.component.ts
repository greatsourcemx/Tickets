import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { SolicitanteService, EmpresasService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styles: []
})
export class SolicitanteComponent implements OnInit {

  solicitante: Usuario = new Usuario('', '', '', '');
  Empresas: Empresa[] = [];

  constructor(
    public _solicitanteService: SolicitanteService,
    public _empresaService: EmpresasService,
    public router: Router) { }

  ngOnInit() {
    this.solicitante.actualizarPassword = true;
    this.cargarEmpresas();
  }

  cargarEmpresas () {
    this._empresaService.cargarEmpresasActivas()
    .subscribe( (resp: any) => {
      this.Empresas = resp;
    });
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
