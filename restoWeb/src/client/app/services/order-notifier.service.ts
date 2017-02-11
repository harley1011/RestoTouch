import {Injectable}     from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class OrderNotifierService {
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

  connectToOrderNotifier() {

  }

  getEndpoint() {
    return this.apiEndpoint;
  }

}
