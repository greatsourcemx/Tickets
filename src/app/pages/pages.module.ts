import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Ng- Bootstrap (DatePicker)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ng- Select
import { NgSelectModule } from '@ng-select/ng-select';

// Graficas
import { ChartsModule } from 'ng2-charts';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

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

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        UsuarioComponent,
        NuevoUsuarioComponent,
        EditUsuarioComponent,
        SolicitantesComponent,
        SolicitanteComponent,
        EditarSolicitanteComponent,
        TiemposComponent,
        MantenimientosComponent,
        PrioridadComponent,
        ServiciosComponent,
        NuevoServicioComponent,
        DetallesServicioComponent,
        PrincipalComponent,
        EmpresasComponent,
        AvancesComponent,
        TicketsComponent,
        TiposComponent,
        TicketComponent,
        TrabajosComponent,
        CerradosComponent,
        ReportesComponent,
        HorasComponent,
        ProyectosComponent,
        EntregaComponent,
        SalidaComponent,
        SinFirmaComponent,
        TransferenciaComponent,
        GenerarComponent,
        AsignadoComponent,
        PerfilComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        PipesModule,
        NgbModule.forRoot(),
        NgSelectModule,
        ChartsModule
    ]
})

export class PagesModule { }
