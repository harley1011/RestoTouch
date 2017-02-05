import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthHttpService } from '../../services/auth-http.services';
import { ApiEndpointService } from '../../services/api-endpoint.service';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
import { User } from '../../shared/models/user';

export function main() {

  describe('Profile Service', () => {

    let profileService: ProfileService;
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
        ProfileService,
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
      profileService = injector.get(ProfileService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });

    it('should get a user', () => {

      initialResponse = profileService.getProfile();

      connection.mockRespond(new Response(new ResponseOptions({body: '{"firstName": "Alex"}'})));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        firstName: 'Alex'
      });
    });

    it('should update a user', () => {

      var user = new User('','','','','');

      initialResponse = profileService.saveProfile(user);

      connection.mockRespond(new Response(new ResponseOptions({ body: '{"success": 1, "description": "Profile Updated"}' })));

      let response: any;
      initialResponse.subscribe(
        (res: any) => {
          response = res;
        }
      );

      expect(response).toEqual({
        success: 1,
        description: 'Profile Updated'
      });
    });
  });
}
