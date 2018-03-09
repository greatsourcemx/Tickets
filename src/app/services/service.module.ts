import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SolicitanteService, LoginGuardGuard, SharedService, SidebarService, UsuarioService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SolicitanteService
  ],
  declarations: []
})
export class ServiceModule { }
