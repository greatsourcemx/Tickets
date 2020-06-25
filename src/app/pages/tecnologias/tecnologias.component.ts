import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
import { Areas } from '../../models/areas.model';
import { SolicitanteService } from '../../services/solicitante/solicitante.service';
import { ProyectosService } from '../../services/service.index';
import {Tecnologia}  from '../../models/tecnologia.model';

import swal from 'sweetalert2';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styles: []
})
export class TecnologiasComponent implements OnInit {

  cargando: boolean = false;
  tecnologias: Tecnologia[] = [];

  query = '';


  constructor( public _solicitanteService: SolicitanteService,
    public _ProyectoService: ProyectosService
    ) { }

  ngOnInit() {
    this.cargarTecnologias();
  }

  cargarTecnologias () {
    this.cargando = true;
    this._ProyectoService.cargarTecnologias('', 0)
    .subscribe( (resp: Tecnologia[]) => {
       debugger; 
      this.tecnologias = resp;
      for (let i = 0; i < this.tecnologias.length; i++) {
            if(this.tecnologias[i].Tipo == "d"){
              this.tecnologias[i].Tipo = "Desarrollo";
            }
             if(this.tecnologias[i].Tipo == "g"){
              this.tecnologias[i].Tipo = "Generico";
            }
        }
      this.cargando = false;
    });
  }

  modificarTec (tecnologia: Tecnologia) {
      debugger;
      tecnologia;
      if (tecnologia.Tipo == 'Generico'){
            tecnologia.Tipo = 'g';
      }
      if (tecnologia.Tipo == 'Desarrollo'){
            tecnologia.Tipo = 'd';
      }
      tecnologia.Nombre = tecnologia.Nombre.toUpperCase()
      this._ProyectoService.editaTecnologia(tecnologia).subscribe( (resp: Tecnologia[]) => {
       this.tecnologias = resp;
       for (let i = 0; i < this.tecnologias.length; i++) {
             if(this.tecnologias[i].Tipo == "d"){
               this.tecnologias[i].Tipo = "Desarrollo";
             }
              if(this.tecnologias[i].Tipo == "g"){
               this.tecnologias[i].Tipo = "Generico";
             }
         }
       this.cargando = false;
       swal.fire('Tecnologia Actualizada', tecnologia.Nombre, 'success');
     });
  }

  crearTecnologias() {
    swal.fire({
      title: 'Nueva Tecnologia',
      text: 'Ingrese el nombre',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        let area: Areas = new Areas(result.value.toUpperCase());
        this._solicitanteService.guardararea( area )
        .subscribe( () => {
          //this.cargarAreas();
        },
        error => {
          swal.fire('Aviso!', error.error, 'warning');
        });
      }
    });
  }
  NuevaTec(){
    let seccionin;
   
    swal.fire({
        title: "Nueva Tecnologia",
        input: 'text',
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: function (seccion) {
              if (seccion != "") {
                  seccionin = seccionin;
                return new Promise(function (resolve) {
                  resolve([
                    seccion,
                  ])
                })
              }else{
                return false;
              }
          },
    }).then((result) => {
        if (result.value) {
            this._ProyectoService.guardaTecnologia(result.value)
            .subscribe( (resp: any) => {
                this.tecnologias = resp;
                for (let i = 0; i < this.tecnologias.length; i++) {
                    if(this.tecnologias[i].Tipo == "d"){
                      this.tecnologias[i].Tipo = "Desarrollo";
                    }
                     if(this.tecnologias[i].Tipo == "g"){
                      this.tecnologias[i].Tipo = "Generico";
                    }
                }
            });
        }
      });
      //var tecnos =this.proyecto.Tecnologias.split(',');
      //this.cargarDesarrollos();
    }
}
