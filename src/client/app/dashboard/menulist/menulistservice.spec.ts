import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MenuListService } from './menulist.service';
import {AuthHttpService} from '../../services/auth.http.services';
import {ApiEndpointService} from '../../services/api.endpoint.service';
import {Router} from '@angular/router';

export function main() {
  describe('Menu List Service', () => {
    let menuListService: MenuListService;
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
        MenuListService,
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
      menuListService = injector.get(MenuListService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should add a restaurant menu', () => {
      var menuId = 2;
      var restaurantId = 3;

      initialResponse = menuListService.addRestaurantMenu(menuId, restaurantId);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Restaurant Menu Added"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Restaurant Menu Added'
      });
    });

    it('should delete a restaurant menu', () => {
      var menuId = 2;
      var restaurantId = 3;

      initialResponse = menuListService.deleteRestaurantMenu(menuId, restaurantId);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Restaurant Menu Deleted"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Restaurant Menu Deleted'
      });
    });
  });
}
