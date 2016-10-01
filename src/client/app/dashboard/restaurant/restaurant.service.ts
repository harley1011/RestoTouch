import { Injectable } from '@angular/core';

import { Restaurant } from '../home/restaurantlist/restaurant';
import { GeneralResponse }  from '../../shared/general.response';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RestaurantService {
  private url = 'http://localhost:10010/restaurant';

  constructor (private http: Http) {}

  getRestaurant (name: string): Observable<Restaurant> {
    return this.http.get(this.url + '/' + name)
      .map(this.extractRestaurantData)
      .catch(this.handleError);
  }

  addRestaurant (restaurant: Restaurant): Observable<GeneralResponse> {
    let body = JSON.stringify(restaurant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
      .map(this.extractGeneralResponseData)
      .catch(this.handleError);
  }

  updateRestaurant (restaurant: Restaurant): Observable<GeneralResponse> {
    let body = JSON.stringify(restaurant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/' + restaurant.name, body, options)
      .map(this.extractGeneralResponseData)
      .catch(this.handleError);
  }

  deleteRestaurant (name: string): Observable<Restaurant> {
    return this.http.delete(this.url + '/' + name)
      .map(this.extractGeneralResponseData)
      .catch(this.handleError);
  }

  private extractRestaurantData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private extractGeneralResponseData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
