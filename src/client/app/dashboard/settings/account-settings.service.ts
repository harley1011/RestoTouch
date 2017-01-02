import { Injectable } from '@angular/core';

import { AccountSettings } from '../../shared/models/accountSettings';
import { GeneralResponse }  from '../../shared/general.response';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import  {ApiEndpointService} from '../../services/api-endpoint.service';

@Injectable()
export class AccountSettingsService {
  private url = '/restaurant';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  getAccountSettings (): Observable<AccountSettings> {
    return this.http.get(this.api.getEndpoint() + this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateAccountSettings (accountSettings: AccountSettings): Observable<GeneralResponse> {
    let body = JSON.stringify(accountSettings);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);

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
