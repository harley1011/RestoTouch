import { Route } from '@angular/router';
import { MenuListComponent } from './index';

export const MenuListRoutes: Route[] = [
  	{
    	path: 'menus',
    	component: MenuListComponent
  	}, {
    	path: 'menus/:id',
    	component: MenuListComponent
  	}
];
