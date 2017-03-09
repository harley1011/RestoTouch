import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Category, CategoryTranslations } from '../../shared/models/category';
import { CategoryService } from '../category/category.service';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';
import {MenuCategory} from '../../shared/models/menu-category';

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
      categoryService = injector.get(CategoryService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should add category', () => {
      var mockTranslation = new CategoryTranslations('', '');
      var mockMenuCategory = new MenuCategory(1,2,1);
      var mockCategory = new Category([],mockTranslation,[],[],mockMenuCategory,1);

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
      var mockTranslation = new CategoryTranslations('', '');
      var mockMenuCategory = new MenuCategory(2,3,2);
      var mockCategory = new Category([],mockTranslation,[],[],mockMenuCategory,2);

      initialResponse = categoryService.updateCategory(mockCategory);
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
      var mockTranslation = new CategoryTranslations('', '');
      var mockMenuCategory = new MenuCategory(1,2,1);
      var mockCategory = new Category([],mockTranslation,[],[],mockMenuCategory,1);

      initialResponse = categoryService.deleteCategory(mockCategory);
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
