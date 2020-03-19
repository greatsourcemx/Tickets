import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

import { Proyectos } from '../../../models/mantenimientos/proyectos.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cambiosdes',
  templateUrl: './cambiosdes.component.html',
  styles: []
})

export class CambiosdesComponent implements OnInit {
    cargando: boolean = false;
    proyes: Proyectos[] = null;
    Estados = ['Activo', 'Concluido', 'Cancelado', 'En Proceso'];
    query = '';

    constructor(public activatedRoute: ActivatedRoute,
        public _manteServices: MantenimientoService,
        public router: Router) {
            activatedRoute.params.subscribe( params => {
            // this.usuario = this._usuarioService.usuario;
             let id = params['id'];
             localStorage['idProy'] = id;
             this.cargarDesarrollos(id);
             });
    }

    ngOnInit() {
        //this.cargarDesarrollos();
    }

    cargarDesarrollos (id) {
        this.cargando = true;
        this._manteServices.cargarDesarrollo(id)
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.proyes = resp;
        });
    }
    public NuevoP() {
        let htmlstr = '';
        let i;
        var json = JSON.parse('{}');
        htmlstr = '<div style="text-align:left; font-weight:200" class="form-group">' +
            '<label for="estatus" style="margin-bottom: 0rem;">Estatus' +
            '</label><select class="form-control" name= "estatus" id="estatus">' +
            '<option>Activo</option><option>Cancelado</option><option>Concluido</option></select></div>' +
            '<div style="text-align:left; font-weight:200; margin-bottom: 3px;" class="form-group">' +
            '<label for="descripcion" style="margin-bottom: 0rem;">Descripcion</label><input type="text" id="descripcion"' +
            ' name = "descripcion" class="form-control" placeholder="Descripcion" aria-label="descripcion" ' +
            'aria-describedby="basic-addon1"></div>';
        swal.fire({
            title: "Nueva Tarea",
            html: htmlstr,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: function () {
                debugger;
                json['avancedesc'] = $('#descripcion').val();
                json['avancedesid'] = localStorage['idProy'];
                json['avanceestado'] = $('#estatus').val();
                  if (json['avanceestado'] != "") {
                    return new Promise(function (resolve) {
                      resolve([
                        json,
                      ])
                    })
                  }else{
                    $('#descripcion').css('border', 'solid 1px #EF5350');
                    return false;
                  }
              },
        }).then((result) => {
            if (result.value) {
                debugger;
                const answers = JSON.stringify(result.value);
                console.log(result.value[0]);
                this._manteServices.guardarAvance(JSON.stringify(result.value[0]))
                .subscribe( (resp: any) => {
                    this.cargando = false;
                    this.proyes = resp;
                });
            }
          });

          //this.cargarDesarrollos();
    }
    public EditarP(proyecto: Proyectos, cambio) {
        this._manteServices.modificarAvance(proyecto).subscribe( usr => {
          },
          error => {
            swal.fire('Aviso!', error.error, 'warning');
          });;
  }
}
