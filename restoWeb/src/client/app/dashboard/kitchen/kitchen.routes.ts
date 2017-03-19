import { Route } from '@angular/router';
import { KitchenComponent } from './kitchen.component';

export const KitchenRoutes: Route[] = [
  	{
    	path: 'kitchen',
    	component: KitchenComponent
  	}, {
	    path: 'kitchen/:id',
	  	component: KitchenComponent
  	}
];
