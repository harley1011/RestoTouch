import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RestaurantService } from '../../restaurant/restaurant.service';
import {AuthHttpService} from '../../../services/auth.http.services';
import {Router} from '@angular/router';

export function main() {
  describe('RestaurantList Service', () => {
    let restaurantListService: RestaurantService;
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
        RestaurantService,
        BaseRequestOptions,
        AuthHttpService,
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
      restaurantListService = injector.get(RestaurantService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should get a list of restaurants', () => {
      initialResponse = restaurantListService.getRestaurants();
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"restaurants": [{"address"' +
        ': "99 Concordia Street, Montreal, QC, Canada", "description": "Italian' +
        ' restaurant", "name": "Paccini"}]}' })));

      let resto: any;
      initialResponse.subscribe(
  			(restaurant: any) => {
  				resto = restaurant;
  			}
  		);

      expect(resto).toEqual([{
        address: '99 Concordia Street, Montreal, QC, Canada',
        description: 'Italian restaurant',
        name: 'Paccini'
      }]);
    });
  });
}
