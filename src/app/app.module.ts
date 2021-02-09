import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ng- Bootstrap (DatePicker)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Rutas
import { APP_ROUTES } from './app.routes';

// pipes
import { GroupByPipe } from './pipes/group-by.pipe';

// Modulos Personalizados
import { PagesModule } from './pages/pages.module';
// import { AuthModule } from './login/auth.module';


// NGRX (Store, Reducer)
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { effectsArr } from './store/effects/index';
// DevTools (Quitar en produccion)
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecoverComponent } from './login/recover.component';
import { ChartsModule } from 'ng2-charts';
  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NgbModule,
     StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( effectsArr ),
    ChartsModule,
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    //   logOnly: environment.production, // Restrict extension to log-only mode
    // })
  ],
  providers: [GroupByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
