import { Route } from '@angular/router';
import { OrderListComponent } from './order-list.component';

export const OrdersRoutes: Route[] = [
  	{
    	path: 'orders',
    	component: OrderListComponent
  	}
];
