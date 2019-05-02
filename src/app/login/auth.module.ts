// Rutas
import { APP_ROUTES } from '../app.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { RecoverComponent } from './recover.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        RecoverComponent
    ],
    imports: [
        APP_ROUTES,
        CommonModule,
        FormsModule,
        RouterModule
    ]
})

export class AuthModule {}

