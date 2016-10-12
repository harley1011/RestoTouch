import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { RestaurantRoutes } from './restaurant/index';
import { CategoryRoutes } from './category/index';
import { MenuListRoutes } from './menulist/index';
import { MenuRoutes } from './menu/index';
import { ChartRoutes } from './charts/index';
import { BlankPageRoutes } from './blank-page/index';
import { TableRoutes } from './tables/index';
import { FormRoutes } from './forms/index';
import { GridRoutes } from './grid/index';
import { BSComponentRoutes } from './bs-component/index';
import { BSElementRoutes } from './bs-element/index';

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
        ...MenuRoutes,
	    	...ChartRoutes,
	    	...BSComponentRoutes,
        ...TableRoutes,
	    	...BlankPageRoutes,
        ...FormRoutes,
        ...GridRoutes,
        ...BSElementRoutes
    	],
      canActivate: [AuthService],
      canActivateChild: [AuthService]
  	}
];
