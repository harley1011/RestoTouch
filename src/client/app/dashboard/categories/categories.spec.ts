import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Category } from '../../shared/models/category';
import { CategoryService } from './categories.service';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';

export function main() {
  describe('Category Service', () => {
    let categoryService: CategoryService;
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
        CategoryService,
        BaseRequestOptions,
        AuthHttpService,
        ApiEndpointService,
        {provide: Router, useValue: routerStub},,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      categoryService = injector.get(CategoryService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should add category', () => {
      var mockCategory = new Category('Food');

      initialResponse = categoryService.addCategory(mockCategory);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "New Category added"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'New Category added'
      });
    });

    it('should update a category', () => {
      var mockCategory = new Category('Food');

      initialResponse = categoryService.updateCategory(mockCategory, 1);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Category updated"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Category updated'
      });
    });

    it('should delete a category', () => {
      initialResponse = categoryService.deleteCategory(1);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Category deleted"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Category deleted'
      });
    });
  });
}
