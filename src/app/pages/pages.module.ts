import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
        EmpresasComponent
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
        PipesModule
    ]
})

export class PagesModule { }
