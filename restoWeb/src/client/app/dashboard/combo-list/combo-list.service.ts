import { Injectable } from '@angular/core';

import {Combo} from '../../shared/models/combo';
import { GeneralResponse }  from '../../shared/general.response';

import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from '../../services/auth-http.services';
import { Observable } from 'rxjs/Observable';
import { ApiEndpointService } from '../../services/api-endpoint.service';

@Injectable()
export class ComboListService {
  private url = '/combos';

  constructor (private http: AuthHttpService, private api: ApiEndpointService) {}

  getCombos (): Observable<Combo[]> {
    return this.http.get(this.api.getEndpoint() + this.url)
      .map((response) => this.extractData(response).combos)
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
