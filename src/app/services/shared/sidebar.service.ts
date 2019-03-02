import { Injectable } from '@angular/core';
import * as data from '../../config/menus.json';

@Injectable()
export class SidebarService {
  Menus: any = [];

  constructor() {
    this.Menus = data;
  }

  cargarMenus( admin: boolean ): any[] {
    this.Menus = data;
    if ( admin ) {
      return this.Menus.default.menuAdmin;
    }
    return this.Menus.default.menu;
  }

}
