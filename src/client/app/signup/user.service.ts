// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { User }           from './user';
import { Observable }     from 'rxjs/Observable';
import { GeneralResponse }  from '../shared/general.response';

@Injectable()
export class UserService {
  private url = 'http://localhost:10010/register';

  constructor (private http: Http) {}

  setToken (token: string) {
    localStorage.setItem('authToken', token);
  }

  registerUser (user: User): Observable<GeneralResponse> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    localStorage.setItem('authToken', body.accessToken);
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
