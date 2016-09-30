import { Injectable } from '@angular/core';

//import { Restaurant, OpeningHour } from '../home/restaurantlist/restaurant';
import { Restaurant } from '../home/restaurantlist/restaurant';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

/*const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'McDonald',
    description: 'Fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 2,
    name: 'Yuan Vegetarien',
    description: 'Asian vegan restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 3,
    name: 'Copper Branch',
    description: 'Vegan fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 4,
    name: 'Burger King',
    description: 'Fast food restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 5,
    name: 'St-Hubert',
    description: 'BBQ restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 6,
    name: 'Cage Aux Sport',
    description: 'Sports Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 7,
    name: 'Paccini',
    description: 'Italian Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 8,
    name: 'Villa Massimo',
    description: 'Italian Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 9,
    name: 'Sushi Shop',
    description: 'Sushi Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 10,
    name: 'Subway',
    description: 'Sandwich fast food Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 11,
    name: 'KFC',
    description: 'Chicken fast food Restaurant',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 12,
    name: 'Restaurant 1',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 13,
    name: 'Restaurant 2',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 14,
    name: 'Restaurant 3',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 15,
    name: 'Restaurant 4',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }, {
    id: 16,
    name: 'Restaurant 5',
    description: 'Restaurant Description',
    address: '7141 Rue Sherbrooke O, Montréal, QC H4B 1R6',
    openingHours: [
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm'),
      new OpeningHour('9:00 am', '5:00 pm')
    ]
  }
];*/

@Injectable()
export class RestaurantService {
  /*getRestaurant(id: number): Promise<Restaurant> {
    var restaurant: Restaurant;
    for (var i = 0; i < RESTAURANTS.length; i++) {
      if (RESTAURANTS[i]['id'] === id) {
        restaurant = RESTAURANTS[i];
        break;
      }
    }
    return Promise.resolve(restaurant);
  }*/

  constructor (private http: Http) {}

  getRestaurant (): Promise<Restaurant[]> {
    var lol = this.http.get('http://localhost:10010/restaurant')
               .toPromise()
               .then(response => response.json().restaurants as Restaurant[])
               .catch(this.handleError);
    return lol;
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
