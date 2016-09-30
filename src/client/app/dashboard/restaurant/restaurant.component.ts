import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Restaurant } from '../home/restaurantlist/restaurant';
import { RestaurantService } from './restaurant.service';

@Component({
	moduleId: module.id,
	selector: 'restaurant-cmp',
	templateUrl: 'restaurant.component.html',
	styleUrls: ['restaurant.css'],
  providers: [RestaurantService]
})

export class RestaurantComponent implements OnInit {
	restaurant: Restaurant;

	constructor(private route: ActivatedRoute, private router: Router,
		private restaurantService: RestaurantService) {}

	/*getRestaurant(id: number): void {
		this.restaurantService.getRestaurant(id).then(restaurant => {
			this.restaurant = restaurant;
		});
	}*/

	getRestaurant(id: number): void {
		/*this.restaurantService.getRestaurant().then(restaurants => {
			console.log('start print restaurants');
			console.log(restaurants);
			console.log(restaurants[0]);
			console.log('end print restaurants');
		});*/
		this.restaurantService.getRestaurant().subscribe(
			restaurants => {
				console.log('start print restaurants');
				console.log(restaurants);
				console.log(restaurants[0]);
				console.log('end print restaurants');
			},
			error =>  {
				console.log(error);
			}
		);
	}

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			if (params['id']) this.getRestaurant(parseInt(params['id']));
		});
  }

	add(): void {
		console.log('add');
	}

	update(): void {
		console.log('update');
	}

	cancel(): void {
		this.router.navigate(['/dashboard/home']);
	}
}
