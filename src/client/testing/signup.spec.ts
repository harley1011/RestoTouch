import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from '../app/services/auth.service';
import {Router} from '@angular/router';

export function main() {
  describe('Signing up User Service', () => {
    let userService: AuthService;
    let backend: MockBackend;
    let connection: any;

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        AuthService,
        Router,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      userService = injector.get(AuthService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });
  });
}
