import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ng- Bootstrap (DatePicker)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Rutas
import { APP_ROUTES } from './app.routes';

// pipes
import { GroupByPipe } from './pipes/group-by.pipe';

// Modulos
import { PagesModule } from './pages/pages.module';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NgbModule
  ],
  providers: [GroupByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
