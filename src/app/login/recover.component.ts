import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  usuario: Usuario = new Usuario();
  correo: string = '';
  token: string = '';

  constructor(public usuarioService: UsuarioService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
                activatedRoute.params.subscribe( params => {
                  this.token = params['id'];
                  if (this.token !== undefined) {
                    this.validarToken();
                  }
                });
              }

  ngOnInit() {
    init_plugins();
  }

  validarToken() {
    this.usuario.token = this.token;
    this.usuarioService.validarToken( this.usuario )
    .subscribe((data: string) => {
      this.redireccionar( data );
    });
  }

  redireccionar( resp: string ) {
    let titulo = 'Se envio la contraseña';
    let texto = 'Se ha generado una nueva contraseña el cual se envió al correo electrónico';
    let icono = 'success';
    if ( resp !== 'OK' ) {
      titulo = 'Advertencia!';
      texto = resp;
      icono = 'warning';
    }


    swal.fire({
      title: titulo,
      text: texto,
     // icon: icono,
      //button: true
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  enviar() {
    this.usuarioService.generaTokenRecuperacion( this.correo )
    .subscribe((data: string) => {
      if ( data === 'OK' ) {
        swal.fire('Correcto!', 'Se envío las instrucciones de la recuperación de la contraseña por correo electrónico', 'success');
        this.correo = '';
        this.router.navigate(['/login']);
      } else {
        swal.fire('Advertencia!', data, 'success');
      }
    });
  }

}
