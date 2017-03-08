import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {ItemService} from "./item.service";
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';
import {Item, ItemTranslations} from "../../shared/models/items";


export function main() {
  describe('Item service', () => {
    let itemService: ItemService;
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
        ItemService,
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

      itemService = injector.get(ItemService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);

    });

    it('should get an item', () => {

      let mockItemTranlsations = new ItemTranslations('Gateau','','fr');
      let mockItem = new Item([],mockItemTranlsations, [], [], '', [], null, null, 1);
      initialResponse = itemService.getItem(mockItem.id);

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' + ': 1, "description": "Got the specified item"}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Got the specified item'
      });

    });

    /*it('should get a list of items', () => {
     let mockItemTranlsations2 = new ItemTranslations('Ice Cream','french caramel','fr');
     let mockSize = new Size([],null,12.10,2);
     let mockItemTranlsations3 = new ItemTranslations('Ice Cream','english dark chocolate','en');
     let mockItem2 = new Item([],mockItemTranlsations2, [], [], '', [], null, mockSize, 2);
     let mockItem3 = new Item([],mockItemTranlsations3, [], [], '', [], null, mockSize, 3);
     itemService.addItem(mockItem2);
     itemService.addItem(mockItem3);

     initialResponse = itemService.getItems();

     connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' + ': 1, "description": "Got item list"}' })));

     let response: any;
     initialResponse.subscribe(
     (res: any) => {
     response = res;
     }
     );

     expect(response).toEqual({
     success: 1,
     description: 'Got item list'
     });

     });*/

    it('should add an item', () => {


      let mockItemTranlsations = new ItemTranslations('Cheesecakeu','','en');
      let mockItem = new Item([],mockItemTranlsations, [], [], '', [], null, null, 2);
      initialResponse = itemService.addItem(mockItem);

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' + ': 1, "description": "Added an item"}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Added an item'
      });
    });

    it('should delete an item', () => {

      let mockItemTranlsations = new ItemTranslations('Cheesecakeu','','en');
      let mockItem = new Item([],mockItemTranlsations, [], [], '', [], null, null, 2);
      initialResponse = itemService.deleteItem(mockItem.id);

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' + ': 1, "description": "Delete specified item"}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Delete specified item'
      });
    });
  });
}
