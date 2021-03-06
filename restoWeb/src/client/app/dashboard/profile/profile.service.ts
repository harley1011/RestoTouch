import { Injectable } from '@angular/core';

import { User } from '../../shared/models/user';
import { GeneralResponse }  from '../../shared/general.response';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api-endpoint.service';

@Injectable()
export class ProfileService {
  private url = '/profile';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  getProfile (): Observable<User> {
    return this.http.get(this.api.getEndpoint() + this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveProfile (user: User): Observable<GeneralResponse> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.api.getEndpoint() + this.url, body, options)
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
