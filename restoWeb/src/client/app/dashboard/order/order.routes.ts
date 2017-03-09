import { Route } from '@angular/router';
import { OrderComponent } from './order.component';

export const OrderRoutes: Route[] = [
  {
    path: 'order/:id',
    component: OrderComponent
  }
];
