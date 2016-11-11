import {Injectable}     from '@angular/core';
import {AuthHttpService} from './auth-http.services';
import {ApiEndpointService} from './api-endpoint.service';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
@Injectable()
export class ImageUploadService {
  constructor(private http: AuthHttpService, private rawHttp: Http, private api: ApiEndpointService) {
  }

  getS3Key(imageName: string, imageType: string) {
    return this.http
      .get(this.api.getEndpoint() + '/s3ImageUploadUrl' + '?imageName=' + imageName + '&imageType=' + imageType)
      .map(this.extractData)
      .catch(this.handleError);
  }

  uploadImage(url: string, signedRequest: string,  file: any) {
    // this.rawHttp.put(signedRequest, file).subscribe(response => {
    //   console.log(response);
    //   return url;
    // }, error => {
    //   console.log(error);
    // });
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('works');
        } else {
          console.log('Could not upload file.');
        }
      }
    };

    xhr.upload.onprogress = (event) => {
      console.log(Math.round(event.loaded / event.total * 100));
    };
    xhr.send(file);
    return url;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
