import { Route } from '@angular/router';
import { UnpaidOrdersComponent } from './unpaid-orders.component';

export const UnpaidOrdersRoutes: Route[] = [
  	{
    	path: 'unpaidOrders',
    	component: UnpaidOrdersComponent
  	}, {
	    path: 'unpaidOrders/:id',
	  	component: UnpaidOrdersComponent
  	}
];
