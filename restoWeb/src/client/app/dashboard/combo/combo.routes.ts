import { Route } from '@angular/router';
import { ComboComponent } from './index';

export const ComboRoutes: Route[] = [
  {
  	path: 'combo',
  	component: ComboComponent
  }, {
    path: 'combo/:id',
  	component: ComboComponent
  }
];
