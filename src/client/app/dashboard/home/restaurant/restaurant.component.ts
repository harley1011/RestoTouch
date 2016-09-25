import { Component } from '@angular/core';

import { Restaurant } from './restaurant';

const RESTAURANTS: Restaurant[] = [
  {name: 'McDonald', description: 'Fast food restaurant'},
  {name: 'Yuan Vegetarien', description: 'Asian vegan restaurant'},
  {name: 'Copper Branch', description: 'Vegan fast food restaurant'}
];

@Component({
	moduleId: module.id,
	selector: 'restaurant-cmp',
	templateUrl: 'restaurant.component.html',
	styleUrls: ['restaurant.css'],
})
export class RestaurantComponent {
  restaurants = RESTAURANTS;
}
