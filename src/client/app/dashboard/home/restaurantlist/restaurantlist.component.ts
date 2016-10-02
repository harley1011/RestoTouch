import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Restaurant } from './restaurant';
import { RestaurantService } from '../../restaurant/restaurant.service';

@Component({
	moduleId: module.id,
	selector: 'restaurantlist-cmp',
	templateUrl: 'restaurantlist.component.html',
	styleUrls: ['restaurantlist.css'],
  providers: [RestaurantService]
})

export class RestaurantListComponent implements OnInit {
  numOfRestaurants: number;
  restaurants: Restaurant[];

  constructor(private restaurantListService: RestaurantService, private router: Router) { }

	getRestaurants(): void {
		this.restaurantListService.getRestaurants().subscribe(
			restaurants => {
				this.restaurants = restaurants;
				this.numOfRestaurants = this.restaurants.length;
			},
			error =>  {
				console.log(error);
			}
		);
	};

  ngOnInit(): void {
    this.getRestaurants();
  }

	add(): void {
		this.router.navigate(['/dashboard/restaurant']);
	}

	modify(restaurant: Restaurant): void {
		this.router.navigate(['/dashboard/restaurant', restaurant.name]);
	}
}
