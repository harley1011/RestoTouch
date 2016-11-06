import { Route } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list.component';

export const RestaurantsRoutes: Route[] = [
  	{
    	path: 'restaurants',
    	component: RestaurantListComponent
  	}
];
