import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';
import {MenuCategoryService} from './menu-catergory.service';

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


    });

    it('should update category to Menu', () => {

    });

    it('should delete category to Menu', () => {

    });

  });
}
