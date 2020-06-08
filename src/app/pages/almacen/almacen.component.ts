import { Component, OnInit } from '@angular/core';
import { MantenimientoService, ProyectosService, AlmacenService } from '../../services/service.index';
import { Proyecto } from '../../models/proyecto.model';
import { Allmacen } from '../../models/allmacen.model';

import { Almacen } from '../../models/almacen.model';
import { SeccAlmacen } from '../../models/seccalmacen.model';
import { AlmacenItems } from '../../models/almacenitems.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-softwaredes',
  templateUrl: './almacen.component.html',
  styles: [],
  styleUrls: ['../agenda/agenda.component.css', '../principal/iconos.component.css']
})

export class AlmacenComponent implements OnInit {
    cargando: boolean = false;
    Almacen: Almacen[] = null;
    Almacenin: Almacen = new Almacen();
    secaal: SeccAlmacen[] = null;
    italmacen: AlmacenItems[] = null;
    isDesc: boolean = false;
    column: string = 'CategoryName';
    seccion: SeccAlmacen = new SeccAlmacen();
    cajon: Almacen = new Almacen();
    allmacen : Allmacen[] = null; 
    direction: number;
    mostrar: number = 0;

    query = '';
    selectedsec: number = 0;
    
    constructor(public _manteServices: MantenimientoService,
      public _ProyectoService: ProyectosService,
      public _AlmacenService: AlmacenService,) {

    }

    ngOnInit() {
        this.cargarAlmacen();
        this.cargaAllmacen();
    }
    
   
    public selectedName:any;
  
    public highlightRow(emp) {
      this.selectedName = emp.name;
    }
    busqueda(texto){

        $("#tablebody").html("<tr></tr>");
        //var json = JSON.Parse(this.allmacen);
        for(let i = 0; i < this.allmacen.length; i++){
            for(let y = 0; y < this.allmacen[i].cajones.length; y++){
                 for(let x = 0; x < this.allmacen[i].cajones[y].items.length; x++){
                    if(this.allmacen[i].cajones[y].items[x].Nombre.includes(texto.toUpperCase())){
                          
                            $("#tableq tbody").append(
                                "<tr>" +
                                  "<td>"+this.allmacen[i].seccion.Nombre+"</td>" +
                                  "<td>"+this.allmacen[i].cajones[y].AlmCajon+"</td>" +
                                  "<td>"+this.allmacen[i].cajones[y].items[x].Nombre+"</td>" +
                                "</tr>"
                            );
                    }
                }
            }
        }
    }

    public inputquery(texto){
        var conta=0;
        $('#datalist').empty();
        //var json = JSON.Parse(this.allmacen);
        for(let i = 0; i < this.allmacen.length; i++){
            for(let y = 0; y < this.allmacen[i].cajones.length; y++){
                 for(let x = 0; x < this.allmacen[i].cajones[y].items.length; x++){
                    if(this.allmacen[i].cajones[y].items[x].Nombre.includes(texto.toUpperCase())){
                        conta++;
                        $("#datalist").append(new Option(this.allmacen[i].cajones[y].items[x].Nombre));
                    }
                     if(conta == 3 ){break;}
                }
                if(conta == 3 ){break;}
            }
            if(conta == 3 ){break;}
        }
    }

    onSearchChange(searchValue: string): void {  
        searchValue;
      }
    cargaAllmacen () {
        this.cargando = true;
        this._AlmacenService.cargarAllmacen()
        .subscribe( (resp: any) => {
            debugger;
            this.cargando = false;
            this.allmacen = resp;
        });
    }
    sort(property) {
      this.isDesc = !this.isDesc;  
      this.column = property;
      this.direction = this.isDesc ? 1 : -1;
    }

    add() {
      this.mostrar = 1;
    }
    cargaCajon(secc: SeccAlmacen) {
      
      $(this).addClass('highlight').siblings().removeClass('highlight');
        this.selectedsec=secc.id;
        this.seccion =secc;
        this.cajon = new Almacen();
        this.cargando = true;
        this._AlmacenService.cargarCaja(secc.id)
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.Almacen = resp;
            this.italmacen = [];
        });
        this.mostrar =0;

      }
    cargaItems(alm: Almacen) {
        this.cajon = alm;
        this.cargando = true;
        this._AlmacenService.cargarItems(alm.id)
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.italmacen = resp;
        });
        this.mostrar =0;

      }
    cargarAlmacen () {
        this.cargando = true;
        this._AlmacenService.cargarAlmacen()
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.secaal = resp;
        });
        this.mostrar =0;

    }

    EliminarItem (italm) {
        this.cargando = true;
        this._AlmacenService.eliminarItem(italm.id, this.cajon.id)
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.italmacen = resp;
        });
    }


 public NuevaSec() {
        let seccionin;
       
        swal.fire({
            title: "Nueva Seccion",
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
                this._AlmacenService.guardaSeccion(result.value)
                .subscribe( (resp: any) => {
                    this.cargando = false;
                    this.secaal = resp;
                });
            }
          });

          //this.cargarDesarrollos();
    }

    public NuevaCaja() {
        let seccionin;
       
        swal.fire({
            title: "Nuevo Cajon",
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
                debugger;
                this.Almacenin.AlmEstante = this.seccion.id.toString();
                this.Almacenin.AlmCajon = result.value[0];
                this._AlmacenService.guardaCaja(result.value[0], this.seccion.id)
                .subscribe( (resp: any) => {
                    this.cargando = false;
                    this.Almacen = resp;
                });
            }
          });

          //this.cargarDesarrollos();
    }


    public NuevoItem() {
        let seccionin;
        let item = $('#browser').val();
        this.Almacenin.AlmEstante = this.seccion.id.toString();
        this.Almacenin.AlmCajon = item.toString();
        this._AlmacenService.guardaItem(item, this.cajon.id)
        .subscribe( (resp: any) => {
            this.cargando = false;
            this.italmacen = resp;

        });
          this.cargaAllmacen();
          this.mostrar =0;
    }
   

    public EditarItm(item) {
        let seccionin;
       debugger;
        swal.fire({
            title: "Editar " + item.Nombre,
            input:  "text" ,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            preConfirm: function (nombre) {
                  if (nombre != item.Nombre) {
                      seccionin = seccionin;
                    return new Promise(function (resolve) {
                      resolve([
                        nombre,
                      ])
                    })
                  }else{
                    return false;
                  }
              },
        }).then((result) => {
            if (result.value) {
                debugger;
                this._AlmacenService.editarItem(result.value[0], item.id)
                .subscribe( (resp: any) => {
                    this.cargando = false;
                    this.allmacen = resp;
                });
            }
            this._AlmacenService.cargarItems(this.cajon.id)
            .subscribe( (resp: any) => {
            this.cargando = false;
            this.italmacen = resp;
        });
          });
          this.cargaAllmacen();
    }

}
