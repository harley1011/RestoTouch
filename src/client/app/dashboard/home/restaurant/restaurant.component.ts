import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant';
import { RestaurantService } from './restaurant.service';

@Component({
	moduleId: module.id,
	selector: 'restaurant-cmp',
	templateUrl: 'restaurant.component.html',
	styleUrls: ['restaurant.css'],
  providers: [RestaurantService]
})

export class RestaurantComponent implements OnInit {
  numOfRestaurants: number;
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) { }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().then(restaurants => {
			this.restaurants = restaurants;
			this.numOfRestaurants = this.restaurants.length;
		});
  }

  ngOnInit(): void {
    this.getRestaurants();
  }

	modify(restaurant: Restaurant): void {
		console.log(restaurant.name);
	}
}
