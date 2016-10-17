import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant, RestaurantTranslations } from '../../shared/models/restaurant';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';

export function main() {
  describe('Restaurant Service', () => {
    let restaurantService: RestaurantService;
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
      restaurantService = injector.get(RestaurantService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should get a restaurant', () => {
      initialResponse = restaurantService.getRestaurant(1);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"address"' +
        ': "99 Concordia Street, Montreal, QC, Canada", "description": "Italian' +
        ' restaurant", "name": "Paccini"}' })));

      let resto: any;
      initialResponse.subscribe(
  			(restaurant: any) => {
  				resto = restaurant;
  			}
  		);

      expect(resto).toEqual({
        address: '99 Concordia Street, Montreal, QC, Canada',
        description: 'Italian restaurant',
        name: 'Paccini'
      });
    });

    it('should add a restaurant', () => {
      var mockTranslation = new RestaurantTranslations('','','');
      var mockRestaurant = new Restaurant('',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        [], [], mockTranslation, [], 1
      );

      initialResponse = restaurantService.addRestaurant(mockRestaurant);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Restaurant Added"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Restaurant Added'
      });
    });

    it('should update a restaurant', () => {
      var mockTranslation = new RestaurantTranslations('','','');
      var mockRestaurant = new Restaurant('',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        [], [], mockTranslation, [], 1
      );

      initialResponse = restaurantService.updateRestaurant(mockRestaurant);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Restaurant Updated"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Restaurant Updated'
      });
    });

    it('should delete a restaurant', () => {
      var mockTranslation = new RestaurantTranslations('','','');
      var mockRestaurant = new Restaurant('',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        '9:00', '21:00',
        [], [], mockTranslation, [], 1
      );
      initialResponse = restaurantService.deleteRestaurant(mockRestaurant);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Restaurant Deleted"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Restaurant Deleted'
      });
    });
  });
}
