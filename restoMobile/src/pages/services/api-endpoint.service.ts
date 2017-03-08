import {Injectable}     from '@angular/core';

@Injectable()
export class ApiEndpointService {
  public localApiEndpoint = 'http://localhost:10010';
  public apiDevEndpoint = 'https://resto-touch-dev.herokuapp.com';
  public apiEndpoint = 'https://resto-touch-.herokuapp.com';

  constructor() {
  }

  getEndpoint() {
    return this.localApiEndpoint;
  }

}
