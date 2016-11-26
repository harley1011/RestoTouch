import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api-endpoint.service';
import { GeneralResponse }  from '../../shared/general.response';


@Injectable()
export class MenuCategoryService {

  private url = '/menuCategory';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}


  addMenuCategory (menuId: number, categoryId: number): Observable<GeneralResponse> {//TODO , order: number
    var categoryMenu = {
      menuId: menuId,
      categoryId: categoryId,
      //order: order,
    };
    let body = JSON.stringify(categoryMenu);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

/*  Not needed for now
  updateMenuCategory (menuId: number, categoryId: number): Observable<GeneralResponse> {
    var categoryMenu = {
      menuId: menuId,
      categoryId: categoryId
    };
    let body = JSON.stringify(categoryMenu);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.api.getEndpoint() + this.url + '/' + menuId + '+' + categoryId, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  deleteMenuCategory (menuId: number, categoryId: number): Observable<GeneralResponse> {
    return this.http.delete(this.api.getEndpoint() + this.url + '/' + menuId + '+' + categoryId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
