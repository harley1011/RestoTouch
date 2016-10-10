import { Route } from '@angular/router';
import { MenuComponent } from './index';

export const MenuRoutes: Route[] = [
  {
  	path: 'menu',
  	component: MenuComponent
  }, {
    path: 'menu/:name',
  	component: MenuComponent
  }
];
