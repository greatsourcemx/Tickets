import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from '../services/guard/login-guard.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario.component';
import { SolicitantesComponent } from './solicitantes/solicitantes.component';
import { SolicitanteComponent } from './solicitantes/solicitante.component';
import { EditarSolicitanteComponent } from './solicitantes/editar-solicitante.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Dashboard' }  },
            { path: 'grafica1', component: Graficas1Component , data: { titulo: 'Dashboard' } },
            { path: 'usuarios', component: UsuarioComponent, data: { titulo: 'Usuarios' }  },
            { path: 'usuario', component: NuevoUsuarioComponent, data: { titulo: 'Nuevo Usuario' }  },
            { path: 'usuario/:id', component: EditUsuarioComponent, data: { titulo: 'Editar Usuario' }  },
            { path: 'solicitantes', component: SolicitantesComponent, data: { titulo: 'Solicitantes' }  },
            { path: 'solicitante', component: SolicitanteComponent, data: { titulo: 'Nuevo Solicitante' }  },
            { path: 'solicitante/:id', component: EditarSolicitanteComponent, data: { titulo: 'Editar Solicitante' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
