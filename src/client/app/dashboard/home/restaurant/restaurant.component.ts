import { Component } from '@angular/core';

export class Restaurant {
  name: string;
  description: string;
}

const RESTAURANTS: Restaurant[] = [
  {name: 'McDonald', description: 'Fast food restaurant'},
  {name: 'Yuan Vegetarien', description: 'Asian vegan restaurant'},
  {name: 'Copper Branch', description: 'Vegan fast food restaurant'}
];

@Component({
	moduleId: module.id,
	selector: 'restaurant-cmp',
	templateUrl: 'restaurant.component.html'
})
export class RestaurantComponent {
  restaurants = RESTAURANTS;
}
