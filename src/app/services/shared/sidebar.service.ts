import { Injectable } from '@angular/core';
import * as data from '../../config/menus.json';

@Injectable()
export class SidebarService {
  Menus: any = [];

  constructor() {
    this.Menus = data;
  }

}
