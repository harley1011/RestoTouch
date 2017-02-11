import { Injectable } from '@angular/core';


import { GeneralResponse }  from '../shared/general.response';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from './auth-http.services';
import { Observable } from 'rxjs/Observable';
import { ApiEndpointService } from './api-endpoint.service';

@Injectable()
export class OrderService {
  private url = '/category';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  placeOrder (order: any): Observable<GeneralResponse> {
    let body = JSON.stringify(order);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + 'placeOrder', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  retrieveOrders (id: number): Observable<any> {
    return this.http.get(this.api.getEndpoint() + this.url + '/' + id)
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
