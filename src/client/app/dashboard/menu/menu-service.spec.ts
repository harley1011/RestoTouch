import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../../shared/models/menu';


export function main() {

  describe('Menu Service', () => {

    let menuService: MenuService;
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
        MenuService,
        BaseRequestOptions,
        AuthHttpService,
        ApiEndpointService,
        {provide: Router, useValue: routerStub},
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      menuService = injector.get(MenuService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should get a Menu', () => {

      initialResponse = menuService.getMenu('Lunch Menu');

      connection.mockRespond(new Response(new ResponseOptions({body: '{"name": "Lunch Menu"}'})));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        name: 'Lunch Menu'
      });
    });

    it('should get a list of Menus', () => {

      initialResponse = menuService.getMenus();

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"menus": [{"name": "Salad Menu"},{"name": "Drinks Menu"}]}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual([{name: 'Salad Menu'},{name: 'Drinks Menu'}]);
    });

    it('should add a Menu', () => {

      var mockMenu = new Menu('Lunch Menu');

      initialResponse = menuService.addMenu(mockMenu);

      connection.mockRespond(new Response(new ResponseOptions({body: '{"success": 1, "description": "Menu Added"}'})));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Menu Added'
      });
    });

    it('should update a Menu', () => {

     var mockMenu = new Menu('Dinner Menu');

      initialResponse = menuService.updateMenu(mockMenu,'Lunch Menu');

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success": 1, "description": "Menu Updated"}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Menu Updated'
      });
    });

    it('should delete a Menu', () => {

      initialResponse = menuService.deleteMenu('Lunch Menu');
      connection.mockRespond(new Response(new ResponseOptions({body: '{"success": 1, "description": "Menu Deleted"}'})));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Menu Deleted'
      });
    });
  });
}


