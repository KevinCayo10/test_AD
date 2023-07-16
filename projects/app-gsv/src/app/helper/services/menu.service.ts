import { Injectable } from '@angular/core';

export interface IMenu {
  number: string;
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private listaMenu: IMenu[] = [
    { number: '1', title: 'Home', url: '/', icon: 'fa-solid fa-house' },

    {
      number: '7',
      title: 'Usuarios',
      url: '/usuario',
      icon: 'fas fa-user',
    },

    {
      number: '7',
      title: 'Equipos',
      url: '/equipo',
      icon: 'fas fa-box',
    },
    {
      number: '8',
      title: 'Prestamos',
      url: '/prestamo',
      icon: 'fas fa-clipboard-list',
    },
  ];
  constructor() {}

  getMenu(): IMenu[] {
    return [...this.listaMenu];
  }

  getMenuByUrl(url: string): IMenu {
    return this.listaMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
