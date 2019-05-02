import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './login/recover.component';
import { LoginGuardGuard } from './services/service.index';

const appRoute: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'recover', component: RecoverComponent  },
    { path: 'recover/:id', component: RecoverComponent  },
    { path: '**', component: NopagefoundComponent  },
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
        canLoad: [ LoginGuardGuard ]
    },
];

export const APP_ROUTES = RouterModule.forRoot( appRoute, { useHash: true } );
