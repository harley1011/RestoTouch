// Observable Version
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

import {User} from '../shared/models/user';
import {Observable}     from 'rxjs/Observable';
import {GeneralResponse}  from '../shared/general.response';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate, CanActivateChild {

  public loggedInUser: User;
  private loggedIn = false;

  private url = '';

  constructor(private http: Http, private router: Router) {
    var data = localStorage.getItem('user');
    if (data !== null) {
      this.loggedInUser = JSON.parse(data);
    }
  }

  canActivate() {
    if (this.loggedIn) {
      return true;
    }
    this.router.navigate(['/']);
    return false;

  }

  canActivateChild() {
    return this.canActivate();
  }

  isLoggedIn(): boolean {
    if (this.loggedInUser) {
      return true;
    }
    return false;
  }

  authenticateUser(user: User): Observable<GeneralResponse> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/login', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerUser(user: User): Observable<GeneralResponse> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/register', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    localStorage.setItem('authToken', body.accessToken);
    localStorage.setItem('user', JSON.stringify(body.user));
    this.loggedIn = true;
    var data = localStorage.getItem('user');
    if (data !== null) {
      this.loggedInUser = JSON.parse(data);
    }
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
