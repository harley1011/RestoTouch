import {Injectable}     from '@angular/core';

@Injectable()
export class ApiEndpointService {
  public apiEndpoint = 'http://localhost:10010';
  private env = '<%= BUILD_TYPE %>';

  constructor() {
    console.log(this.env);
    if (this.env === 'dev') {
      this.apiEndpoint = 'http://localhost:10010';
    } else {
      this.apiEndpoint = '';
    }
  }

  getEndpoint() {
    return this.apiEndpoint;
  }

}
