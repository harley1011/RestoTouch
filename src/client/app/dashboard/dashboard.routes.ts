import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { RestaurantRoutes } from './restaurant/index';
import { CategoryRoutes } from './category/index';
import { MenuListRoutes } from './menu-list/index';
import { MenuRoutes } from './menu/index';

import { DashboardComponent } from './index';
import { AuthService} from '../services/auth.service';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
        ...CategoryRoutes,
        ...RestaurantRoutes,
        ...MenuListRoutes,
        ...MenuRoutes
    	],
      canActivate: [AuthService],
      canActivateChild: [AuthService]
  	}
];
