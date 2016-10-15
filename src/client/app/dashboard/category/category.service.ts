import { Injectable } from '@angular/core';
import { Category } from '../category/category';
import { AuthHttpService } from '../../services/auth.http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api.endpoint.service';
import { Response } from '@angular/http';

@Injectable()
export class CategoryService {
  private url = '/category';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  // Extracts the list of category
  getCategories (): Observable<Category[]> {
    return this.http.get(this.api.getEndpoint() + this.url)
                    .map((response) => this.extractData(response).categories)
                    .catch(this.handleError);
  }

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
