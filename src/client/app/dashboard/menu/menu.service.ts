/*import { Injectable } from '@angular/core';

import { Menu } from './menu';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth.http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api.endpoint.service';

@Injectable()
export class MenuService {
  private url = '/menu';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  getMenu (name: string): Observable<Menu> {
    return this.http.get(this.api.getEndpoint() + this.url + '/' + name)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMenus (): Observable<Menu[]> {
    return this.http.get(this.api.getEndpoint() + this.url)
      .map((response) => this.extractData(response).menus)
      .catch(this.handleError);
  }

  addMenu (menu: Menu): Observable<GeneralResponse> {
    let body = JSON.stringify(menu);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateMenu (menu: Menu, oldName: string): Observable<GeneralResponse> {
    let body = JSON.stringify(menu);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.api.getEndpoint() + this.url + '/' + oldName, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteMenu (name: string): Observable<Menu> {
    return this.http.delete(this.api.getEndpoint() + this.url + '/' + name)
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
}*/
