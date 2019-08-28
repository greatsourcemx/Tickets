import { Component, OnInit } from '@angular/core';
import { Servicio, Usuario, Tipo } from '../../models/models.index';
import { ServiciosService, UsuarioService, SolicitanteService, TiposService } from '../../services/service.index';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-cerrados',
  templateUrl: './cerrados.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class CerradosComponent implements OnInit {

  admins: Usuario[];
  users: Usuario[];
  tipos: Tipo[];
  Tickets: Servicio[];
  filtros: Servicio = new Servicio('');
  totalRegistros: number = 0;
  cargando = false;
  showNavegacion = false;
  isAdmin = false;

  // Para rango de fechas
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(
    public _servicioService: ServiciosService,
    public _soliService: SolicitanteService,
    public _adminService: UsuarioService,
    public _tiposService: TiposService,
    public _usuarioService: UsuarioService,
    public calendar: NgbCalendar ) {
      this._usuarioService.esAdmin()
      .subscribe((data: boolean) => {
        this.isAdmin = data;
      });
      this.fromDate = calendar.getToday(); // calendar.getNext(calendar.getToday(), 'd', -10);
      this.toDate = calendar.getToday();
    }

  ngOnInit() {
    this.cargarTickets();
    this.cargarUsers();
    this.cargarAdmins();
    this.cargarTipos();
  }

  cargarAdmins ( ) {
    this._adminService.cargarUsuaActivos( )
    .subscribe( (resp: any) => {
      this.admins = resp;
    });
  }

  cargarUsers ( ) {
    this._soliService.cargarSoliActivos( )
    .subscribe( (resp: any) => {
      this.users = resp;
    });
  }

  cargarTipos () {
    this._tiposService.cargarTiposActivos()
    .subscribe( (resp: any) => {
      this.tipos = resp;
    });
  }

  cargarTickets () {
    this.cargando = true;
    this.filtros.FecRegistro = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    if (this.toDate !== null) {
      this.filtros.FecCerrado = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    } else {
      this.filtros.FecCerrado = new Date(1800, 0, 1);
    }

    this._servicioService.cargarTicketsCerrados( this.filtros )
    .subscribe((resp: any) => {
      if (resp.length !== 0) {
        this.totalRegistros = resp[0].Total;
        this.showNavegacion = this.totalRegistros >= 15;
      }
      if (this._usuarioService.usuario.rol === 'USER') {
        this.Tickets = resp.filter(t => t.TipoServicio.id === 1);
      } else {
        this.Tickets = resp;
      }
      this.cargando = false;
    });
  }

  reabrir( serv: Servicio ) {
    swal.fire({
      title: '¿Re abrir el Ticket?',
      text: serv.Id + ' ' + serv.Titulo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06d79c',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#398bf7',
    }).then((result) => {
      if (result.value) {
        this.abrirTicket( serv );
      }
    });
  }

  abrirTicket( serv: Servicio) {
    this._servicioService.abrir( serv )
    .subscribe(() => {
      swal.fire(serv.Id + ' : ' + serv.Titulo, 'Se ha abierto', 'success');
      this.cargarTickets();
    });
  }

  quitarFiltros () {
    this.filtros = new Servicio('');
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getToday();
    this.cargarTickets();
  }

  cambiarDesde( valor: number ) {
    let desde = this.filtros.desde + valor;
    let totalPages = Math.ceil(this.totalRegistros / 15);
    if ( desde >= totalPages ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.filtros.desde += valor;
    this.cargarTickets();
  }

  // Funciones para Rango de Fechas
  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
