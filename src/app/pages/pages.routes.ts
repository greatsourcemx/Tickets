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
import { ReportesComponent } from './reportes/reportes.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { HorasComponent } from './reportes/horas.component';
import * as Equipos from './equipos/equipos.index';
import { GenerarComponent } from './solicitantes/generar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecurrentesComponent } from './recurrentes/recurrentes.component';
import { NuevoComponent } from './recurrentes/nuevo.component';
import { EditRecurrenteComponent } from './recurrentes/edit-recurrente.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ZonasComponent } from './mantenimientos/zonas/zonas.component';
import { TableroComponent } from './mantenimientos/tablero/tablero.component';
import { ManteTicketComponent } from './mantenimientos/mante-ticket/mante-ticket.component';
import { EvaluacionesComponent } from './reportes/evaluaciones.component';
import { ParametrosComponent } from './mantenimientos/parametros/parametros.component';
import { DetalledesComponent } from './mantenimientos/detalledes/detalledes.component';
import { SoftwaredesComponent } from './mantenimientos/detalledes/softwaredes.component';
import { CambiosdesComponent } from './mantenimientos/detalledes/cambiosdes.component';
import { NuevoDesComponent } from './mantenimientos/detalledes/nuevopdes.component';
import { NuevoDesGenComponent } from './mantenimientos/detalledes/nuevopgen.component'; 
import { EditarDesComponent } from './mantenimientos/detalledes/editardes.component'; 
import { AreasComponent } from './areas/areas.component';
import { TipoTicketComponent } from './tipoticket/tipoticket.component';
import { GraficaRatings } from './graficarating/graficarating.component'; 
import { DetallesProyecto } from './mantenimientos/detalledes/detallepro.component';
import { ProyectoGenComponent } from './mantenimientos/detalledes/proyectogen.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component'; 
import { NuevoTPComponent } from './mantenimientos/detalledes/nuevotp.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AlmacenComponent } from './almacen/almacen.component'; 
import { EqiposRHComponent } from './equipos/equiposrh/equiposrh.component';
import { ConsRHComponent } from './reportes/consrh.component';
import { AccesConComponent } from './accescon/accescon.component';
import { NuevoServiciocComponent } from './servicioc/nuevoservicio.component'; 
import { ServiciocComponent } from './servicioc/servicioc.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'principal', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Solicitudes' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Empresas' } },
            { path: 'graficas', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'usuarios', component: UsuarioComponent, data: { titulo: 'Usuarios' }  },
            { path: 'usuario', component: NuevoUsuarioComponent, data: { titulo: 'Nuevo Usuario' }  },
            { path: 'usuario/:id', component: EditUsuarioComponent, data: { titulo: 'Editar Usuario' }  },
            { path: 'solicitantes', component: SolicitantesComponent, data: { titulo: 'Solicitantes' }  },
            { path: 'solicitante/nuevos', component: GenerarComponent, data: { titulo: 'Solicitantes' }  },
            { path: 'solicitante', component: SolicitanteComponent, data: { titulo: 'Nuevo Solicitante' }  },
            { path: 'solicitante/:id', component: EditarSolicitanteComponent, data: { titulo: 'Editar Solicitante' }  },
            { path: 'tiempos', component: TiemposComponent, data: { titulo: 'Tiempos' }  },
            { path: 'tipos', component: TiposComponent, data: { titulo: 'Tipo de Servicios' }  },
            { path: 'mantenimientos', component: MantenimientosComponent, data: { titulo: 'Mantenimientos' }  },
            { path: 'mantenimientos/:id', component: ManteTicketComponent, data: { titulo: 'Mantenimiento' }  },
            { path: 'mantenimiento/parametros', component: ParametrosComponent, data: { titulo: 'Parámetros' }  },
            { path: 'mantenimiento/detalledes', component: DetalledesComponent, data: { titulo: 'Proyectos' }  },
            { path: 'mantenimiento/softwaredes', component: SoftwaredesComponent, data: { titulo: 'Proyectos Software' }  },
            { path: 'mantenimiento/proyectogen', component: ProyectoGenComponent, data: { titulo: 'Proyectos' }  },

            { path: 'tablero', component: TableroComponent, data: { titulo: 'Tablero' }  },
            { path: 'zonas', component: ZonasComponent, data: { titulo: 'Zonas' }  },
            { path: 'prioridades', component: PrioridadComponent, data: { titulo: 'Prioridades' }  },
            { path: 'servicio/:id', component: DetallesServicioComponent, data: { titulo: 'Detalle del Servicio' }  },
            { path: 'detallepro/:id', component: DetallesProyecto, data: { titulo: 'Detalle del Proyecto' }  },
            { path: 'editardes/:id', component: EditarDesComponent, data: { titulo: 'Editar Desarrollo' }  },
            { path: 'ticket', component: TicketComponent, data: { titulo: 'Nuevo Ticket' }  },
            { path: 'tickets', component: TrabajosComponent, data: { titulo: 'Tickets Globales' }  },
            { path: 'cerrados', component: CerradosComponent, data: { titulo: 'Tickets Cerrados' }  },
            { path: 'tickets/:id/:combo', component: TicketsComponent, data: { titulo: 'Detalle del Ticket' }  },
            { path: 'avances/:id', component: AvancesComponent, data: { titulo: 'Avances' }  },
            { path: 'reporte', component: ReportesComponent, data: { titulo: 'Porcentajes' }  },
            { path: 'horas', component: HorasComponent, data: { titulo: 'Horas' }  },
            { path: 'reporte/evaluaciones', component: EvaluacionesComponent, data: { titulo: 'Evaluaciones' }  },
            { path: 'entrega', component: Equipos.EntregaComponent, data: { titulo: 'Entrega de Equipo' }  },
            { path: 'retorno', component: Equipos.SalidaComponent, data: { titulo: 'Retorno de Equipo' }  },
            { path: 'equiposrh', component:  EqiposRHComponent, data: { titulo: 'Consulta de Equipo' }  },
            { path: 'reporterh', component:  ConsRHComponent, data: { titulo: 'Retorno de Equipo' }  },
            { path: 'accescon', component:  AccesConComponent, data: { titulo: 'Acceso Equipos' }  },
            { path: 'nuevoservicio', component:  NuevoServiciocComponent, data: { titulo: 'Nuevo Servicio' }  },
            { path: 'nuevoservicio/:id', component:  NuevoServiciocComponent, data: { titulo: 'Nuevo Servicio' }  },

            { path: 'servicioc', component:  ServiciocComponent, data: { titulo: 'Servicios' }  }, 

            { path: 'transferencias', component: Equipos.TransferenciaComponent, data: { titulo: 'Transferencia' }  },
            { path: 'nofirmas', component: Equipos.SinFirmaComponent, data: { titulo: 'Responsiva sin Firmar' }  },
            { path: 'asignado', component: Equipos.AsignadoComponent, data: { titulo: 'Equipo Asignado' }  },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' }  },
            { path: 'recurrentes', component: RecurrentesComponent, data: { titulo: 'Recurrentes' }  },
            { path: 'recurrente/nuevo', component: NuevoComponent, data: { titulo: 'Recurrente' }  },
            { path: 'recurrente/:id', component: EditRecurrenteComponent, data: { titulo: 'Recurrente' }  },
            { path: 'nuevatarea/:id', component: NuevoTPComponent, data: { titulo: 'Nueva Tarea' }  },
            
            { path: 'calendario', component: CalendarioComponent, data: { titulo: 'Calendario' }  },
            { path: 'agenda', component: AgendaComponent, data: { titulo: 'Agenda' }  },
            { path: 'areas', component: AreasComponent, data: { titulo: 'Areas Laborales' }  },
            { path: 'tecnologias', component: TecnologiasComponent, data: { titulo: 'Tecnologias' }  },
            
            { path: 'tipoticket', component: TipoTicketComponent, data: { titulo: 'Tipos de Tickets' }  },
            { path: 'graficarating', component: GraficaRatings, data: { titulo: 'Graficas Rating' }  },
            { path: 'cambiosdes/:id', component: CambiosdesComponent, data: { titulo: 'Cambios Desarrollo' }  },
            { path: 'nuevopdes', component: NuevoDesComponent, data: { titulo: 'Nuevo Proyecto' }  },
            { path: 'nuevopgen', component: NuevoDesGenComponent, data: { titulo: 'Nuevo Proyecto' }  },
            { path: 'almacen', component: AlmacenComponent, data: { titulo: 'Almacen' }  },

            { path: '', redirectTo: '/principal', pathMatch: 'full'  },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
