import { Injectable } from '@angular/core';

import { Restaurant } from './restaurant';

const RESTAURANTS: Restaurant[] = [
  {name: 'McDonald', description: 'Fast food restaurant'},
  {name: 'Yuan Vegetarien', description: 'Asian vegan restaurant'},
  {name: 'Copper Branch', description: 'Vegan fast food restaurant'},
  {name: 'Burger King', description: 'Fast food restaurant'},
  {name: 'St-Hubert', description: 'BBQ restaurant'},
  {name: 'Cage Aux Sport', description: 'Sports Restaurant'},
  {name: 'Paccini', description: 'Italian Restaurant'},
  {name: 'Villa Massimo', description: 'Italian Restaurant'},
  {name: 'Sushi Shop', description: 'Sushi Restaurant'},
  {name: 'Subway', description: 'Sandwich fast food Restaurant'}
];

@Injectable()
export class RestaurantService {
  getRestaurants(): Promise<Restaurant[]> {
    return Promise.resolve(RESTAURANTS);
  }
}
