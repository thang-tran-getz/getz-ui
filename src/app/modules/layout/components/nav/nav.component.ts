import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public items: MenuItem[] | undefined;
  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'English', code: 'EN' },
      { name: 'China', code: 'CN' },
    ];

    this.selectedCity = {
      code: 'EN',
      name: 'English'
    }

    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
      },
      {
        label: 'Menu',
        routerLink: '/menu',
        items: [
          {
            label: 'Category 1',
            icon: 'pi pi-fw pi-align-left',
            routerLink: '/home',
          },
          {
            label: 'Category 2',
            icon: 'pi pi-fw pi-align-right',
            routerLink: '/home',
          },
          {
            label: 'Category 3',
            icon: 'pi pi-fw pi-align-center',
            routerLink: '/home',
          },
          {
            label: 'Category 4',
            icon: 'pi pi-fw pi-align-justify',
            routerLink: '/home',
          },
        ],
      },
      {
        label: 'About',
        routerLink: '/about',
      },
    ];
  }
}
