import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Combo, ComboTranslations } from '../../shared/models/combo';
import { ComboService } from '../combo/combo.service';
import {AuthHttpService} from '../../services/auth-http.services';
import {ApiEndpointService} from '../../services/api-endpoint.service';
import {Router} from '@angular/router';

export function main() {
  describe('Combo Service', () => {
    let comboService: ComboService;
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
        ComboService,
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
      comboService = injector.get(ComboService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should add combo', () => {
      var mockTranslation = new ComboTranslations('', '', '', null, '');
      var mockCombo = new Combo([], mockTranslation, [], [], 1);

      initialResponse = comboService.addCombo(mockCombo);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "New Combo added"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'New Combo added'
      });
    });

    it('should update a combo', () => {
      var mockTranslation = new ComboTranslations('', '', '', null, '');
      var mockCombo = new Combo([], mockTranslation, [], [], 1);

      initialResponse = comboService.updateCombo(mockCombo);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Combo updated"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Combo updated'
      });
    });

    it('should delete a combo', () => {
      var mockTranslation = new ComboTranslations('', '', '', null, '');
      var mockCombo = new Combo([], mockTranslation, [], [], 1);

      initialResponse = comboService.deleteCombo(mockCombo);
      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success"' +
        ': 1, "description": "Combo deleted"}' })));

      let response: any;
      initialResponse.subscribe(
  			(res: any) => {
  				response = res;
  			}
  		);

      expect(response).toEqual({
        success: 1,
        description: 'Combo deleted'
      });
    });
  });
}
