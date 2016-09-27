import { Injectable } from '@angular/core';

import { Restaurant } from '../home/restaurantlist/restaurant';

const RESTAURANTS: Restaurant[] = [
  {id: 1, name: 'McDonald', description: 'Fast food restaurant'},
  {id: 2, name: 'Yuan Vegetarien', description: 'Asian vegan restaurant'},
  {id: 3, name: 'Copper Branch', description: 'Vegan fast food restaurant'},
  {id: 4, name: 'Burger King', description: 'Fast food restaurant'},
  {id: 5, name: 'St-Hubert', description: 'BBQ restaurant'},
  {id: 6, name: 'Cage Aux Sport', description: 'Sports Restaurant'},
  {id: 7, name: 'Paccini', description: 'Italian Restaurant'},
  {id: 8, name: 'Villa Massimo', description: 'Italian Restaurant'},
  {id: 9, name: 'Sushi Shop', description: 'Sushi Restaurant'},
  {id: 10, name: 'Subway', description: 'Sandwich fast food Restaurant'},
  {id: 11, name: 'KFC', description: 'Chicken fast food Restaurant'},
  {id: 12, name: 'Restaurant 1', description: 'Restaurant Description'},
  {id: 13, name: 'Restaurant 2', description: 'Restaurant Description'},
  {id: 14, name: 'Restaurant 3', description: 'Restaurant Description'},
  {id: 15, name: 'Restaurant 4', description: 'Restaurant Description'},
  {id: 16, name: 'Restaurant 5', description: 'Restaurant Description'}
];

@Injectable()
export class RestaurantService {
  getRestaurant(id: number): Promise<Restaurant> {
    var restaurant: Restaurant;
    for (var i = 0; i < RESTAURANTS.length; i++) {
      if (RESTAURANTS[i]['id'] === id) {
        restaurant = RESTAURANTS[i];
        break;
      }
    }
    return Promise.resolve(restaurant);
  }
}
