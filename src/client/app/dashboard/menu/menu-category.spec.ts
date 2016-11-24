import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';
import {MenuCategoryService} from './menu-catergory.service';
import {Menu} from '../../shared/models/menu';
import {Category} from '../../shared/models/category';


export function main() {

  describe('Menu-Category Service', () => {

    let menuCategoryService: MenuCategoryService;
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
        MenuCategoryService,
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

      menuCategoryService = injector.get(MenuCategoryService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);

    });

    it('should add category to Menu', () => {

      var mockCategories = Category[new Category('Salads'), new Category('Burgers'),new Category('Sweets')];

      var mockMenu = new Menu('Lunch Menu', mockCategories);
      var mockSandwishes = new Category('Sandwishes');

        initialResponse = menuCategoryService.addMenuCategory(mockMenu.id, mockSandwishes.id);

        connection.mockRespond(new Response(new ResponseOptions({body: '{"success": 1, "description": "Menu Category Added"}'})));

        let response: any;
        initialResponse.subscribe(
          (res: any) => {
            response = res;
          }
        );

        expect(response).toEqual({
          success: 1,
          description: 'Menu Category Added'
        });

    });

    it('should update category to Menu', () => {
      var mockCategories = [new Category('Salads'), new Category('Burgers') , new Category('Sweets')];

      var mockMenu1= new Menu('Lunch Menu', mockCategories);
      var mockMenu2 = new Menu('Dinner Menu', []);

      for (let i=0; i < mockCategories.length; i++) {
        initialResponse = menuCategoryService.updateMenuCategory(mockMenu2.id, mockMenu1.categories[i].id);

        connection.mockRespond(new Response(new ResponseOptions({body: '{"success": 1, "description": "Menu Category Updated"}'})));

        let response: any;
        initialResponse.subscribe(
          (res: any) => {
            response = res;
          }
        );

        expect(response).toEqual({
          success: 1,
          description: 'Menu Category Updated'
        });
      }
    });

    it('should delete category to Menu', () => {

      var mockCategories = [new Category('Salads'), new Category('Burgers'), new Category('Sweets')];

      var mockMenu = new Menu('Lunch Menu', mockCategories);

      initialResponse = menuCategoryService.deleteMenuCategory(mockMenu.id, mockMenu.categories[0].id);
      connection.mockRespond(new Response(new ResponseOptions({body: '{"success": 1, "description": "Menu Category Deleted"}'})));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Menu Category Deleted'
      });
    });

  });
}
