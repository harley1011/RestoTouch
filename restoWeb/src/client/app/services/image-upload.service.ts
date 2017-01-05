import {Injectable}     from '@angular/core';
import {AuthHttpService} from './auth-http.services';
import {ApiEndpointService} from './api-endpoint.service';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {Http} from '@angular/http';
@Injectable()
export class ImageUploadService {
  progress$: Observable<any>;
  private progressObserver: any;

  constructor(private http: AuthHttpService, private rawHttp: Http, private api: ApiEndpointService) {
    this.progress$ = Observable.create((observer: Observer<number>) => {
      this.progressObserver = observer;
    }).share();
  }

  getS3Key(imageName: string, imageType: string) {
    return this.http
      .get(this.api.getEndpoint() + '/s3ImageUploadUrl' + '?imageName=' + imageName + '&imageType=' + imageType)
      .map(this.extractData)
      .catch(this.handleError);
  }

  resizeImage(width: number, height: number, img: any) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    console.log(img);
    console.log(context);

  }

  uploadImage(url: string, signedRequest: string,
              file: string) {
    return Observable.create((observer: Observer<number>) => {
      let byteString: string;
      if (file.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(file.split(',')[1]);
      // else
      //   byteString = unescape(file.split(',')[1]);

      // separate out the mime component
      var mimeString = file.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      var b = new Blob([ia], {type: mimeString});
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.setRequestHeader('Cache-Control', 'max-age=100000000000');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('works');
            observer.next(xhr.response);
            observer.complete();
           // onFinish();
          } else {
            console.log('Could not upload file.');
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.progressObserver.next(Math.round(event.loaded / event.total * 100));
      };
      xhr.send(b);
    });
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
