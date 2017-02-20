import {Injectable}     from '@angular/core';

@Injectable()
export class ApiEndpointService {
  public apiEndpoint = 'http://localhost:10010';
  private env = '<%= BUILD_TYPE %>';

  constructor() {
    //console.log(this.env);
  }

  getEndpoint() {
    return this.apiEndpoint;
  }

}
