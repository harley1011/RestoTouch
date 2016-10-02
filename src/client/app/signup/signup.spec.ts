import {ReflectiveInjector} from '@angular/core';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {AuthService} from '../services/auth.service';
// import {SignupComponent} from './signup.component';
import {Router} from '@angular/router';

// import {ComponentFixture, TestBed, spyOn} from '@angular/core/testing';
// import {By}              from '@angular/platform-browser';
// import {DebugElement}    from '@angular/core';

// TestBed.configureTestingModule({declarations: [SignupComponent],
// providers: [AuthService,
//   {provide: Router, useValue: routerStub}]});
//
// fixture = TestBed.createComponent(SignupComponent);
//
// let authService = fixture.debugElement.injector.get(AuthService);
// let spy = spyOn(authService, 'registerUser')
//   .and.returnValue(Promise.resolve('j'));
//
// it('should not show quote before OnInit', () => {
//   expect(el.textContent).toBe('', 'nothing displayed');
//   expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
// });

export function main() {
  describe('Signing up User Service', () => {
    let userService: AuthService;
    let backend: MockBackend;
    let connection: any;

    beforeEach(() => {

      var routerStub = {
        navigate: function (arr: string) {
          return arr;
        }
      };


      let injector = ReflectiveInjector.resolveAndCreate([
        AuthService,
        {provide: Router, useValue: routerStub},
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
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
