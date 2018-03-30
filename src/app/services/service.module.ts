import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  MantenimientoService,
  TiempoService,
  SolicitanteService,
  LoginGuardGuard,
  SharedService,
  SidebarService,
  UsuarioService,
  ServiciosService,
  PrioridadService,
  EmpresasService } from './service.index';

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
    SolicitanteService,
    TiempoService,
    MantenimientoService,
    ServiciosService,
    PrioridadService,
    EmpresasService
  ],
  declarations: []
})
export class ServiceModule { }
