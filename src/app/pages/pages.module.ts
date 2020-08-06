import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Ng- Bootstrap (DatePicker)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng- Select
import { NgSelectModule } from '@ng-select/ng-select';

// ColorPicker
import { ColorPickerModule } from 'ngx-color-picker';

// DataTables
import { DataTablesModule } from 'angular-datatables';

// file-drop
import { NgxFileDropModule } from 'ngx-file-drop';

// pdf
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

// Graficas
import { ChartsModule } from 'ng2-charts';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// NGRX (Store, Reducer)
import { StoreModule } from '@ngrx/store';
import { ticketReducer } from '../store/reducers/tickets.reducer';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario.component';
import { SolicitantesComponent } from './solicitantes/solicitantes.component';
import { SolicitanteComponent } from './solicitantes/solicitante.component';
import { EditarSolicitanteComponent } from './solicitantes/editar-solicitante.component';
import { TiemposComponent } from './tiempos/tiempos.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { NuevoServicioComponent } from './servicios/nuevo-servicio.component';
import { DetallesServicioComponent } from './servicios/detalles-servicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { AvancesComponent } from './avances/avances.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TiposComponent } from './tipos/tipos.component';
import { TicketComponent } from './tickets/ticket.component';
import { TrabajosComponent } from './tickets/trabajos.component';
import { CerradosComponent } from './tickets/cerrados.component';
import { ReportesComponent } from './reportes/reportes.component';
import { HorasComponent } from './reportes/horas.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { EntregaComponent } from './equipos/entrega/entrega.component';
import { SalidaComponent } from './equipos/salida/salida.component';
import { SinFirmaComponent } from './equipos/sin-firma/sin-firma.component';
import { TransferenciaComponent } from './equipos/transferencia/transferencia.component';
import { GenerarComponent } from './solicitantes/generar.component';
import { AsignadoComponent } from './equipos/asignado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecurrentesComponent } from './recurrentes/recurrentes.component';
import { NuevoComponent } from './recurrentes/nuevo.component';
import { EditRecurrenteComponent } from './recurrentes/edit-recurrente.component';
import { MarcadoresComponent } from './principal/marcadores.component';
import { RatingComponent } from './dashboard/rating.component';
import { ContadoresComponent } from './graficas1/contadores/contadores.component';
import { AvgRatingsComponent } from './graficas1/avg-ratings/avg-ratings.component';
import { AvgEmpresasComponent } from './graficas1/avg-empresas/avg-empresas.component';
import { TopSolicitantesComponent } from './graficas1/top-solicitantes/top-solicitantes.component';
import { TopHorasComponent } from './graficas1/top-horas/top-horas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ZonasComponent } from './mantenimientos/zonas/zonas.component';
import { TableroComponent } from './mantenimientos/tablero/tablero.component';
import { ManteTicketComponent } from './mantenimientos/mante-ticket/mante-ticket.component';
import { UltimosManteComponent } from './mantenimientos/tablero/ultimos-mante/ultimos-mante.component';
import { ManteVencidosComponent } from './mantenimientos/tablero/mante-vencidos/mante-vencidos.component';
import { ManteMasivosComponent } from './mantenimientos/tablero/mante-masivos/mante-masivos.component';
import { EvaluacionesComponent } from './reportes/evaluaciones.component';
import { ParametrosComponent } from './mantenimientos/parametros/parametros.component';
import { DetalledesComponent } from './mantenimientos/detalledes/detalledes.component';
import { NuevoDesComponent } from './mantenimientos/detalledes/nuevopdes.component';

import { NuevoDesGenComponent } from './mantenimientos/detalledes/nuevopgen.component';

import { SoftwaredesComponent } from './mantenimientos/detalledes/softwaredes.component';
import { DetallesProyecto } from './mantenimientos/detalledes/detallepro.component';
import { EditarDesComponent } from './mantenimientos/detalledes/editardes.component';
import { ProyectoGenComponent } from './mantenimientos/detalledes/proyectogen.component';

import { NuevoTPComponent } from './mantenimientos/detalledes/nuevotp.component';
import { NuevoTPgenComponent } from './mantenimientos/detalledes/nuevotpgen.component';


import { CambiosdesComponent } from './mantenimientos/detalledes/cambiosdes.component';
import { GraficaRatings } from './graficarating/graficarating.component';

import { AreasComponent } from './areas/areas.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';

import { AlmacenComponent } from './almacen/almacen.component';
import { TipoTicketComponent } from './tipoticket/tipoticket.component';
import { AgendaComponent } from './agenda/agenda.component';
import { EqiposRHComponent } from './equipos/equiposrh/equiposrh.component';

import { ConsRHComponent } from './reportes/consrh.component';

import { AccesConComponent } from './accescon/accescon.component';



@NgModule({
    declarations: [
        PagesComponent,
        ConsRHComponent,
        EqiposRHComponent,
        AccesConComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        UsuarioComponent,
        NuevoUsuarioComponent,
        EditUsuarioComponent,
        SolicitantesComponent,
        SolicitanteComponent,
        EditarSolicitanteComponent,
        NuevoDesGenComponent,
        TiemposComponent,
        MantenimientosComponent,
        PrioridadComponent,
        ServiciosComponent,
        NuevoServicioComponent,
        DetallesServicioComponent,
        NuevoTPComponent,
        DetallesProyecto,
        NuevoTPgenComponent,
        TecnologiasComponent,
        ProyectoGenComponent,
        PrincipalComponent,
        EmpresasComponent,
        AvancesComponent,
        TicketsComponent,
        NuevoDesComponent,
        TiposComponent,
        EditarDesComponent,
        AlmacenComponent,
        TicketComponent,
        TrabajosComponent,
        CerradosComponent,
        ReportesComponent,
        HorasComponent,
        ProyectosComponent,
        GenerarComponent,
        AsignadoComponent,
        PerfilComponent,
        EntregaComponent,
        SalidaComponent,
        SinFirmaComponent,
        TransferenciaComponent,
        RecurrentesComponent,
        NuevoComponent,
        EditRecurrenteComponent,
        MarcadoresComponent,
        RatingComponent,
        ContadoresComponent,
        AvgRatingsComponent,
        AvgEmpresasComponent,
        TopSolicitantesComponent,
        TopHorasComponent,
        CalendarioComponent,
        ZonasComponent,
        TableroComponent,
        ManteTicketComponent,
        UltimosManteComponent,
        ManteVencidosComponent,
        ManteMasivosComponent,
        EvaluacionesComponent,
        ParametrosComponent,
        DetalledesComponent,
        SoftwaredesComponent,
        CambiosdesComponent,
        AgendaComponent,
        AreasComponent,
        TipoTicketComponent,
        GraficaRatings
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        RouterModule,
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        PipesModule,
        NgbModule.forRoot(),
        NgSelectModule,
        ChartsModule,
        DataTablesModule,
        ColorPickerModule,
        NgxFileDropModule,
        NgxExtendedPdfViewerModule,
        StoreModule.forFeature( 'servicios', ticketReducer )
    ]
})

export class PagesModule { }
