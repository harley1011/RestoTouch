import {Http, RequestOptions, Headers, RequestOptionsArgs} from '@angular/http';
import {Injectable}     from '@angular/core';
import {Router} from '@angular/router';


@Injectable()
export class AuthHttpService {

  constructor(private http: Http, private router: Router) {
  }

  post(url: string, body: any, options?: RequestOptionsArgs) {
    let accessToken = localStorage.getItem('authToken');
    if (options) {
      options.headers.append('x-access-token', accessToken);
      return this.http.post(url, body, options);
    }

    let headers = new Headers({'x-access-token': accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options);
  }


  get(url: string, options?: RequestOptionsArgs) {
    let accessToken = localStorage.getItem('authToken');
    if (options) {
      options.headers.append('x-access-token', accessToken);
      return this.http.get(url, options);
    }

    let headers = new Headers({'x-access-token': accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.get(url, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs) {
    let accessToken = localStorage.getItem('authToken');
    if (options) {
      options.headers.append('x-access-token', accessToken);
      return this.http.put(url, body, options);
    }

    let headers = new Headers({'x-access-token': accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options);
  }


  delete(url: string, options?: RequestOptionsArgs) {
    let accessToken = localStorage.getItem('authToken');
    if (options) {
      options.headers.append('x-access-token', accessToken);
      return this.http.delete(url, options);
    }

    let headers = new Headers({'x-access-token': accessToken});
    options = new RequestOptions({headers: headers});
    return this.http.delete(url, options);
  }

}
