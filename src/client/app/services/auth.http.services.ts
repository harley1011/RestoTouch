import {Http, RequestOptions, Headers, RequestOptionsArgs} from '@angular/http';
import {Injectable}     from '@angular/core';
import {Router} from '@angular/router';


@Injectable()
export class AuthHttpService {
  private accessToken: string;

  constructor(private http: Http, private router: Router) {
    this.accessToken = localStorage.getItem('authToken');
  }

  post(url: string, body: any, options?: RequestOptionsArgs) {
    if (options) {
      options.headers.append('x-access-token', this.accessToken);
      return this.http.post(url, body, options);
    }

    let headers = new Headers({'x-access-token': this.accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options);
  }


  get(url: string, options?: RequestOptionsArgs) {
    if (options) {
      options.headers.append('x-access-token', this.accessToken);
      return this.http.get(url, options);
    }

    let headers = new Headers({'x-access-token': this.accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.get(url, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs) {
    if (options) {
      options.headers.append('x-access-token', this.accessToken);
      return this.http.put(url, body, options);
    }

    let headers = new Headers({'x-access-token': this.accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options);
  }


  delete(url: string, options?: RequestOptionsArgs) {
    if (options) {
      options.headers.append('x-access-token', this.accessToken);
      return this.http.delete(url, options);
    }

    let headers = new Headers({'x-access-token': this.accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.delete(url, options);
  }

}
