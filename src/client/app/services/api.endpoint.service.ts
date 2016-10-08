import {Injectable}     from '@angular/core';

@Injectable()
export class ApiEndpointService {
   public apiEndpoint = 'http://localhost:10010';

  getEndpoint() {
    return this.apiEndpoint;
  }

}
