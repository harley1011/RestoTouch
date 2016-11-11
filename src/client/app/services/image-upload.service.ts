import {Injectable}     from '@angular/core';
import {AuthHttpService} from './auth-http.services';
import {ApiEndpointService} from './api-endpoint.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageUploadService {
  private url = '/sign-s3';

  constructor(private http: AuthHttpService, private api: ApiEndpointService ) {
  }

  getS3Key(imageName: string, imageType: string) {
    return this.http
      .get(this.api.getEndpoint() + this.url + '?imageName=' + imageName + '&imageType=' + imageType)
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
