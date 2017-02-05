import {Injectable} from '@angular/core';

import {Order} from '../shared/models/order';
import {GeneralResponse}  from '../shared/general.response';

import {Response, Headers, RequestOptions} from '@angular/http';
import {AuthHttpService} from '../services/auth-http.services';
import {Observable} from 'rxjs/Observable';
import  {ApiEndpointService} from '../services/api-endpoint.service';
import  {RestaurantService} from '../services/restaurant.service';

@Injectable()
export class OrderService {

  constructor(private http: AuthHttpService, private api: ApiEndpointService, private restaurantListService: RestaurantService,) {
  }

  placeOrder(order: Order): Observable<GeneralResponse> {
    order.restaurantId = this.restaurantListService.selectedRestaurant.id;
    let body = JSON.stringify({order});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.api.getEndpoint() + '/placeOrder', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
