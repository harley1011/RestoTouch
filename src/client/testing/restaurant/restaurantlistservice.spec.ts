import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RestaurantListService } from '../../app/dashboard/home/restaurantlist/restaurantlist.service';

export function main() {
  describe('RestaurantList Service', () => {
    let restaurantListService: RestaurantListService;
    let backend: MockBackend;
    let initialResponse: any;
    let connection: any;

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        RestaurantListService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      restaurantListService = injector.get(RestaurantListService);
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
