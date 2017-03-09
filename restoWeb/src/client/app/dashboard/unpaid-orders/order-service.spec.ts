import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/models/order';

import { AuthHttpService } from '../../services/auth-http.services';
import { ApiEndpointService } from '../../services/api-endpoint.service';
import { Router } from '@angular/router';

export function main() {
  describe('OrderService Service', () => {
    let orderService: OrderService;
    let backend: MockBackend;
    let initialResponse: any;
    let connection: any;

    beforeEach(() => {

      var routerStub = {
        navigate: function (arr: string) {
          return arr;
        }
      };

      let injector = ReflectiveInjector.resolveAndCreate([
        OrderService,
        BaseRequestOptions,
        AuthHttpService,
        ApiEndpointService,
        {provide: Router, useValue: routerStub},
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      orderService = injector.get(OrderService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should get a list of orders', () => {
      initialResponse = orderService.retrieveOrders(1);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"orders": [{"orderedItems"' +
        ': "[]", "total": "5", "paymentId": "1"}]}' })));

      let o: any;
      initialResponse.subscribe(
  			(order: any) => {
  				o = order;
  			}
  		);

      expect(o).toEqual({
      	orders: [{
      		orderedItems: '[]',
        	total: '5',
        	paymentId: '1'
      	}]
      });
    });

    it('should add an order', () => {
      var mockOrder = new Order([], 10, 1, '1');

      initialResponse = orderService.placeOrder(mockOrder);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Order stored"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Order stored'
      });
    });

  });
}
