import { Route } from '@angular/router';
import { KitchenCashierSelectComponent } from './kitchen-cashier-select.component';

export const KitchenCashierSelectRoutes: Route[] = [
  	{
    	path: 'modeSelect',
    	component: KitchenCashierSelectComponent
  	}, {
	    path: 'modeSelect/:id',
	  	component: KitchenCashierSelectComponent
  	}
];
