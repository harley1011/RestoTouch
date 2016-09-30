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
	create: boolean;
	restaurant: Restaurant;

	constructor(private route: ActivatedRoute, private router: Router,
		private restaurantService: RestaurantService) {}

	/*getRestaurant(id: number): void {
		this.restaurantService.getRestaurant(id).then(restaurant => {
			this.restaurant = restaurant;
		});
	}*/

	getRestaurant(id: number): void {
		this.restaurantService.getRestaurant().subscribe(
			restaurants => {
				this.restaurant = restaurants[id - 1];
			},
			error =>  {
				console.log(error);
			}
		);
	}

  ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			if (params['id']) {
				this.getRestaurant(parseInt(params['id']));
				this.create = false;
			} else {
				this.restaurant = new Restaurant(1, '', '', '', [
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'},
		      {open: '9:00', close: '21:00'}
		    ]);
				this.create = true;
			}
		});
  }

	add(): void {
		var values = validateInputs();
		if (values === null) return;

		this.restaurant.name = values['name'];
		this.restaurant.description = values['description'];
		this.restaurant.address = values['address'];
		this.restaurant.openingHours[0]['open'] = values['m_open'];
		this.restaurant.openingHours[0]['close'] = values['m_close'];
		this.restaurant.openingHours[1]['open'] = values['tu_open'];
		this.restaurant.openingHours[1]['close'] = values['tu_close'];
		this.restaurant.openingHours[2]['open'] = values['w_open'];
		this.restaurant.openingHours[2]['close'] = values['w_close'];
		this.restaurant.openingHours[3]['open'] = values['th_open'];
		this.restaurant.openingHours[3]['close'] = values['th_close'];
		this.restaurant.openingHours[4]['open'] = values['f_open'];
		this.restaurant.openingHours[4]['close'] = values['f_close'];
		this.restaurant.openingHours[5]['open'] = values['sa_open'];
		this.restaurant.openingHours[5]['close'] = values['sa_close'];
		this.restaurant.openingHours[6]['open'] = values['su_open'];
		this.restaurant.openingHours[6]['close'] = values['su_close'];

		this.restaurantService.addRestaurant(this.restaurant)
			.subscribe(
				generalResponse => {
					console.log(generalResponse);
				},
				error => {
					console.log(error);
				}
			);
	}

	update(): void {
		console.log('update');
	}

	cancel(): void {
		this.router.navigate(['/dashboard/home']);
	}
}

function validateInputs () {
	function validateTime (input: HTMLInputElement, value: string) {
		var timeFormat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
		if (timeFormat.test(value) === false) {
			return false;
		}

		return true;
	}

	var validationError = false;

	var nameValue = validateInput('name', null);
	if (nameValue === null) validationError = true;

	var descriptionValue = validateInput('description', null);
	if (descriptionValue === null) validationError = true;

	var addressValue = validateInput('address', null);
	if (addressValue === null) validationError = true;

	var mOpenValue = validateInput('m_open', validateTime);
	if (mOpenValue === null) validationError = true;

	var mCloseValue = validateInput('m_close', validateTime);
	if (mCloseValue === null) validationError = true;

	var tuOpenValue = validateInput('tu_open', validateTime);
	if (tuOpenValue === null) validationError = true;

	var tuCloseValue = validateInput('tu_close', validateTime);
	if (tuCloseValue === null) validationError = true;

	var wOpenValue = validateInput('w_open', validateTime);
	if (wOpenValue === null) validationError = true;

	var wCloseValue = validateInput('w_close', validateTime);
	if (wCloseValue === null) validationError = true;

	var thOpenValue = validateInput('th_open', validateTime);
	if (thOpenValue === null) validationError = true;

	var thCloseValue = validateInput('th_close', validateTime);
	if (thCloseValue === null) validationError = true;

	var fOpenValue = validateInput('f_open', validateTime);
	if (fOpenValue === null) validationError = true;

	var fCloseValue = validateInput('f_close', validateTime);
	if (fCloseValue === null) validationError = true;

	var saOpenValue = validateInput('sa_open', validateTime);
	if (saOpenValue === null) validationError = true;

	var saCloseValue = validateInput('sa_close', validateTime);
	if (saCloseValue === null) validationError = true;

	var suOpenValue = validateInput('su_open', validateTime);
	if (suOpenValue === null) validationError = true;

	var suCloseValue = validateInput('su_close', validateTime);
	if (suCloseValue === null) validationError = true;

	if (validationError) return null;

	return {
		name: nameValue,
		description: descriptionValue,
		address: addressValue,
		m_open: mOpenValue,
		m_close: mCloseValue,
		tu_open: tuOpenValue,
		tu_close: tuCloseValue,
		w_open: wOpenValue,
		w_close: wCloseValue,
		th_open: thOpenValue,
		th_close: thCloseValue,
		f_open: fOpenValue,
		f_close: fCloseValue,
		sa_open: saOpenValue,
		sa_close: saCloseValue,
		su_open: suOpenValue,
		su_close: suCloseValue,
	};
}

function validateInput (id: string, callback: any) {
	var input = (<HTMLInputElement>document.getElementById(id));
	var value = input.value;
	if (value === '' || (callback && !callback(input, value))) {
		hasError(input);
		return null;
	}

	hasNoError(input);
	return value;
}

function hasError (element: HTMLInputElement) {
	element.className += ' form-error';
}

function hasNoError (element: HTMLInputElement) {
	element.className = element.className.replace(/\bform-error\b/,'');
}
