import { Route } from '@angular/router';
import { ItemListComponent } from './item-list.component';

export const ItemListRoutes: Route[] = [
  {
  	path: 'items',
  	component: ItemListComponent
  }
];
