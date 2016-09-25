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
  title: '1';
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantService) { }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().then(restaurants => this.restaurants = restaurants);
  }

  ngOnInit(): void {
    this.getRestaurants();
  }
}
