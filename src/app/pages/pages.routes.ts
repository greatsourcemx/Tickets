import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard } from '../services/guard/login-guard.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario.component';
import { SolicitantesComponent } from './solicitantes/solicitantes.component';
import { SolicitanteComponent } from './solicitantes/solicitante.component';
import { EditarSolicitanteComponent } from './solicitantes/editar-solicitante.component';
import { TiemposComponent } from './tiempos/tiempos.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { DetallesServicioComponent } from './servicios/detalles-servicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { AvancesComponent } from './avances/avances.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TiposComponent } from './tipos/tipos.component';
import { TicketComponent } from './tickets/ticket.component';
import { TrabajosComponent } from './tickets/trabajos.component';
import { CerradosComponent } from './tickets/cerrados.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'principal', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Empresas' } },
            { path: 'usuarios', component: UsuarioComponent, data: { titulo: 'Usuarios' }  },
            { path: 'usuario', component: NuevoUsuarioComponent, data: { titulo: 'Nuevo Usuario' }  },
            { path: 'usuario/:id', component: EditUsuarioComponent, data: { titulo: 'Editar Usuario' }  },
            { path: 'solicitantes', component: SolicitantesComponent, data: { titulo: 'Solicitantes' }  },
            { path: 'solicitante', component: SolicitanteComponent, data: { titulo: 'Nuevo Solicitante' }  },
            { path: 'solicitante/:id', component: EditarSolicitanteComponent, data: { titulo: 'Editar Solicitante' }  },
            { path: 'tiempos', component: TiemposComponent, data: { titulo: 'Tiempos' }  },
            { path: 'tipos', component: TiposComponent, data: { titulo: 'Tipo de Servicios' }  },
            { path: 'mantenimientos', component: MantenimientosComponent, data: { titulo: 'Mantenimientos' }  },
            { path: 'prioridades', component: PrioridadComponent, data: { titulo: 'Prioridades' }  },
            { path: 'servicio/:id', component: DetallesServicioComponent, data: { titulo: 'Detalle del Servicio' }  },
            { path: 'ticket', component: TicketComponent, data: { titulo: 'Nuevo Ticket' }  },
            { path: 'tickets', component: TrabajosComponent, data: { titulo: 'Tickets Globales' }  },
            { path: 'tickets/cerrados', component: CerradosComponent, data: { titulo: 'Tickets Cerrados' }  },
            { path: 'tickets/:id', component: TicketsComponent, data: { titulo: 'Detalle del Ticket' }  },
            { path: 'avances/:id', component: AvancesComponent, data: { titulo: 'Avances' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
