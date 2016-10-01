import { Injectable } from '@angular/core';

import { Restaurant } from './restaurant';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantListService {
  private url = 'http://localhost:10010/restaurant';

  constructor (private http: Http) {}

  getRestaurants (): Observable<Restaurant[]> {
    return this.http.get(this.url)
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
