import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UserService } from './user.service.ts';

export function main() {
  describe('Signing up User Service', () => {
    let userService: UserService;
    let backend: MockBackend;
    let connection: any;

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        UserService,
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
      userService = injector.get(UserService);
      backend = injector.get(MockBackend);

      backend.connections.subscribe((c: any) => connection = c);
    });
  });
}
