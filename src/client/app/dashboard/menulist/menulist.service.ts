import { Injectable } from '@angular/core';

//import { Menu } from '../menu/menu';
import { GeneralResponse }  from '../../shared/general.response';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth.http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api.endpoint.service';

@Injectable()
export class MenuListService {
  private url = '/restaurantMenu';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  addRestaurantMenu (menuId: number, restaurantId: number): Observable<GeneralResponse> {
    var restaurantMenu = {
      menuId: menuId,
      restaurantId: restaurantId
    };

    let body = JSON.stringify(restaurantMenu);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRestaurantMenu (menuId: number, restaurantId: number): Observable<GeneralResponse> {
    return this.http.delete(this.api.getEndpoint() + this.url + '/' + restaurantId + '+' + menuId)
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
