import {Injectable}     from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import  {AuthService} from './auth.service';

@Injectable()
export class OrderNotifierService {
  public socketEndpoint = 'http://localhost:10010';
  private env = '<%= BUILD_TYPE %>';

  private socket: SocketIOClient.Socket;

  constructor(private authService: AuthService) {
    if (this.env === 'dev') {
      this.socketEndpoint = 'http://localhost:10010';
    } else {
      this.socketEndpoint = '';
    }
  }

  connectToOrderNotifier() {
    return new Observable((observer: Observer<any>) => {

      this.socket = io.connect(this.socketEndpoint);

      this.socket.on('newOrder', (data: any) => {
        observer.next(data);
      });

      //todo changed restaurantId to the one selected
      this.socket.emit('orderSubscribe', {restaurantId: 100, token: this.authService.loginToken()});
    });
  }

  disconnectFromOrderNotifier() {
    //todo changed restaurantId to the one selected
    this.socket.emit('orderUnsubscribe', {restaurantId: 100, token: this.authService.loginToken()})
  }
}
