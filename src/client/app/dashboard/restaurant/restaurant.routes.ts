import { Route } from '@angular/router';
import { RestaurantComponent } from './index';

export const RestaurantRoutes: Route[] = [
  {
  	path: 'restaurant',
  	component: RestaurantComponent
  }, {
    path: 'restaurant/:id',
  	component: RestaurantComponent
  }
];
