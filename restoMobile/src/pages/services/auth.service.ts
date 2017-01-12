// Observable Version
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import {User} from '../../../../restoCommon/shared/models/user';
import {Observable}     from 'rxjs/Observable';
import {GeneralResponse}  from '../../../../restoCommon/shared/general.response';
import  {ApiEndpointService} from './api-endpoint.service';


import 'rxjs/Rx';

@Injectable()
export class AuthService {

  public loggedInUser: User;

  constructor(private http: Http, private router: NavController, private api: ApiEndpointService) {
    var data = localStorage.getItem('user');
    if (data !== null) {
      this.loggedInUser = JSON.parse(data);
    }
  }

  ionViewCanEnter() {
    if (!this.loggedInUser) {
      var data = localStorage.getItem('user');
      if (data !== null) {
        this.loggedInUser = JSON.parse(data);
      }
    }
    if (this.loggedInUser) {
      return true;
    }

    this.router.push(['/']);
    return false;

  }

//  canActivateChild() {
//    return this.canActivate();
//  }

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

    return this.http.post(this.api.getEndpoint() + '/login', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return Observable.of('authToken');
  }

  registerUser(user: User): Observable<GeneralResponse> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.api.getEndpoint() + '/register', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) : User {
    let body = res.json();
    localStorage.setItem('authToken', body.accessToken);
    localStorage.setItem('user', JSON.stringify(body.user));
    return body.user;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
