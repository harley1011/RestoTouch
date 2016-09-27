import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'restaurant-cmp',
	templateUrl: 'restaurant.component.html',
	styleUrls: ['restaurant.css']
})

export class RestaurantComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			console.log('Restaurant: ' + params['id']);
		});
  }
}
