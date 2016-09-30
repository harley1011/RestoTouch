import { Injectable } from '@angular/core';

import { Restaurant } from '../home/restaurantlist/restaurant';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


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

  getRestaurant (): Observable<Restaurant[]> {
    return this.http.get('http://localhost:10010/restaurant')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.restaurants || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
