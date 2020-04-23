import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../../services/service.index';
import { Proyectos } from '../../../models/mantenimientos/proyectos.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-detalledes',
  templateUrl: './detalledes.component.html',
  styles: []
})

export class DetalledesComponent implements OnInit {
    cargando: boolean = false;
    proyes: Proyectos[] = null;
    isDesc: boolean = false;
    column: string = 'CategoryName';
    direction: number;
    query = '';

    constructor(public _manteServices: MantenimientoService) {

    }

    ngOnInit() {
        this.cargarDesarrollos();
    }
    sort(property) {
      this.isDesc = !this.isDesc; // change the direction
      this.column = property;
      this.direction = this.isDesc ? 1 : -1;
    }
    cargarDesarrollos () {
        this.cargando = true;
        this._manteServices.cargarProyectos()
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.proyes = resp;
        });
    }
    public NuevoP() {
        let campos = ['Desarrollo',
            'Descripcion',
            'Version Viusual Studio',
            'Version MVC', 'Tecnologias',
            'Ruta de codigo',
            'Base de datos']
        let values = ['desarrollo', 'nombre', 'versionvb', 'mvc', 'tecnologias', 'ubicacion', 'bd'];
        let htmlstr = '';
        let valuele = ['30', '60', '50', '20', '200', '250', '100'];
        let i;
        var json = JSON.parse('{}');
        for (i = 0; i < values.length; i++) {
            htmlstr += '<div style="text-align:left; font-weight:200; margin-bottom: 3px;" class="form-group"><label for="' + 
            values[i] + '" style="margin-bottom: 0rem;">' + campos[i] + '</label><input maxlength = "' + valuele[i] + '" type="text" id="' +
                values[i] + '" name = "' + values[i] + '" class="form-control" placeholder="' +
                campos[i] + '" aria-label="' + campos[i] + '" aria-describedby="basic-addon1"></div>';
          }
          htmlstr +='<div style="text-align:left; font-weight:200" class="form-group"><label for="estatus" style="margin-bottom: 0rem;">Estatus</label><select class="form-control" name= "estatus" id="estatus"><option>Activo</option><option>Inactivo</option></select></div>'
        swal.fire({
            html: htmlstr,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: function () {
                for(i = 0; i < values.length; i++) {
                    json[values[i]] = $('#' + values[i] + '').val();
                  }
                  json['estatus'] = $('#estatus').val();
                  if (json['desarrollo'] != "") {
                    return new Promise(function (resolve) {
                      resolve([
                        json,
                      ])
                    })
                  }else{
                    $('#desarrollo').css('border', 'solid 1px #EF5350');
                    return false;
                  }
              },
        }).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value);
                console.log(result.value[0]);
                this._manteServices.guardarProyectos(JSON.stringify(result.value[0]))
                .subscribe( (resp: any) => {
                    this.cargando = false;
                    this.proyes = resp;
                });
            }
          });

          this.cargarDesarrollos();
    }
    public EditarP(proyecto) {
      let campos = ['Desarrollo',
          'Descripcion',
          'Version Viusual Studio',
          'Version MVC', 'Tecnologias',
          'Ruta de codigo',
          'Base de datos']
      let values = ['desarrollo', 'nombre', 'versionvb', 'mvc', 'tecnologias', 'ubicacion', 'bd'];
      let valuele = ['30', '60', '50', '20', '200', '250', '100'];
      let htmlstr = '';
      let i;
      var json = JSON.parse('{}');
      for (i = 0; i < values.length; i++) {
        htmlstr += '<div style="text-align:left; font-weight:200; margin-bottom: 3px;" class="form-group"><label for="' +
        values[i] + '" style="margin-bottom: 0rem;" name = "' + values[i] + '">' + campos[i] + '</label><input  maxlength = "' + valuele[i] + '" type="text" id="' +
        values[i] + '" name = "' + values[i] + '" value="' + proyecto[''+ values[i] + ''] + '" class="form-control" placeholder="' +
        campos[i] + '" aria-label="' + campos[i] + '" aria-describedby="basic-addon1"></div>';
        }
        htmlstr += '<div style="text-align:left; font-weight:200" class="form-group"><label for="estatus" style="margin-bottom: 0rem;">' +
        'Estatus</label><select class="form-control" name= "estatus" id="estatus">' +
        '<option>Activo</option><option>Inactivo</option></select></div>';
      swal.fire({
          html: htmlstr,
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          cancelButtonText: "Cancelar",
          preConfirm: function () {
            for(i = 0; i < values.length; i++) {
                json[values[i]] = $('#' + values[i] + '').val();
            }
            json['estatus'] = $('#estatus').val();
            if (json['desarrollo'] != "") {
              return new Promise(function (resolve) {
                resolve([
                  json,
                ])
              })
            }else{
              $('#desarrollo').css('border', 'solid 1px #EF5350');
              return false;
            }
            },
      }).then((result) => {
              const answers = JSON.stringify(result.value);
              console.log(result.value[0]);
              result.value[0]['proyectoid'] = proyecto['proyectoid'];
              this._manteServices.actualizaProyectos(JSON.stringify(result.value[0]))
              .subscribe( (resp: any) => {
                  this.cargando = false;
                  this.proyes = resp;
              });
        });

        this.cargarDesarrollos();
  }
}
