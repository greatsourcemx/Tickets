import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menuAdmin: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }, {
      titulo: 'Catálogos',
      icono: 'mdi mdi-account',
      submenu: [
        { titulo: 'Solicitantes', url: '/solicitantes' },
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Tiempos', url: '/tiempos' }
      ]
    }
  ];

  constructor() { }

}
