import { Route } from '@angular/router';
import { MenuListComponent } from './index';

export const MenuListRoutes: Route[] = [
  	{
    	path: 'menulist',
    	component: MenuListComponent
  	}, {
    	path: 'menulist/:id',
    	component: MenuListComponent
  	}
];
