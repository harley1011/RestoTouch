import { Injectable } from '@angular/core';
import { Category } from '../category/category';
import { GeneralResponse }  from '../../shared/general.response';
import { AuthHttpService } from '../../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api-endpoint.service';
import { Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CategoryService {
  private url = '/category';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  /**
   * Adds a new category
   */
  addCategory (category: Category): Observable<GeneralResponse> {
    let body = JSON.stringify(category);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.api.getEndpoint() + this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Deletes a category
   */
  deleteCategory (id: number): Observable<Category> {
    return this.http.delete(this.api.getEndpoint() + this.url + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Gets user's categories
   */
  getCategories (): Observable<Category[]> {
    return this.http.get(this.api.getEndpoint() + this.url)
                    .map((response) => this.extractData(response).categories)
                    .catch(this.handleError);
  }

  updateCategory (category: Category, id: number): Observable<GeneralResponse> {
    let body = JSON.stringify(category);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.api.getEndpoint() + this.url + '/' + id, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /////////////////////////////////////////////////////////////////////////////
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(error);
    return Observable.throw(errMsg);
  }
}
