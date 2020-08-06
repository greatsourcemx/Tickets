import { Component, OnInit } from '@angular/core'; 
import { BitacoraRh } from '../../models/models.index';
import { UsuarioService, ReportesService } from '../../services/service.index';
import { GroupByPipe } from '../../pipes/group-by.pipe'; 
import { GlpiService, ExcelService } from '../../services/service.index';

  
@Component({
  selector: 'app-consrh',
  templateUrl: './consrh.component.html',
  styleUrls: ['../agenda/agenda.component.css'],
  styles: []
})

export class ConsRHComponent implements OnInit {

   
  bitacora: BitacoraRh[]; 
  cargando = false; 
 
  query = '';
  isAdmin = false;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
 
  constructor( 
    public _reporteService: ReportesService,
    public _adminService: UsuarioService,
    public _groupBy: GroupByPipe,
    public glpiService: GlpiService, ) {  
  }

  ngOnInit() {
    this.cargaCons(); 
  }
  cargaCons() { 
    this.cargando = true; 
    this.glpiService.cargarBitacorarh( )
    .subscribe((data) => {
      this.cargando = false;
      this.bitacora = data;
    });
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
