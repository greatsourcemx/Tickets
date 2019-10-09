import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

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
  EmpresasService,
  AvancesService,
  TiposService,
  GlpiService,
  ReportesService,
  RecurrentesService,
  ExcelService,
  GraficasService,
  ZonasService,
  ParametrosService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SolicitanteService,
    TiempoService,
    MantenimientoService,
    ServiciosService,
    PrioridadService,
    EmpresasService,
    AvancesService,
    TiposService,
    GlpiService,
    ReportesService,
    RecurrentesService,
    ExcelService,
    GraficasService,
    ZonasService,
    ParametrosService
  ],
  declarations: []
})
export class ServiceModule { }
