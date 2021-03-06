import { Injectable } from '@angular/core';
import { Restaurant } from '../shared/models/restaurant';
import { GeneralResponse }  from '../shared/general.response';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from './auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from './api-endpoint.service';

@Injectable()
export class RestaurantService {
  private url = '/restaurant';

  public selectedRestaurant: Restaurant;

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  getRestaurant (id: number): Observable<Restaurant> {
    return this.http.get(this.api.getEndpoint() + this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRestaurants (): Observable<Restaurant[]> {
    return this.http.get(this.api.getEndpoint() + this.url)
      .map((response) => this.extractData(response).restaurants)
      .catch(this.handleError);
  }

  addRestaurant (restaurant: Restaurant): Observable<GeneralResponse> {
    let body = JSON.stringify(restaurant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateRestaurant (restaurant: Restaurant): Observable<GeneralResponse> {
    let body = JSON.stringify(restaurant);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);

    return this.http.put(this.api.getEndpoint() + this.url + '/' + restaurant.id, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRestaurant (restaurant: Restaurant): Observable<Restaurant> {
    return this.http.delete(this.api.getEndpoint() + this.url + '/' + restaurant.id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
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
