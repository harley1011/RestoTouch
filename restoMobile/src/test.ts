// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import './polyfills.ts';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { App, Config, Form, IonicModule, Keyboard, DomController, GestureController, MenuController, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { ConfigMock, NavMock, NavParamMock, PlatformMock } from './mocks';
import { TranslateModule} from 'ng2-translate/ng2-translate';
import { AuthHttpService } from './pages/services/auth-http.services';
import { AuthService } from './pages/services/auth.service';
import { ApiEndpointService } from './pages/services/api-endpoint.service';
import { CategoryService } from './pages/services/category.service';
import { ItemService } from './pages/services/item.service';
import { MenuService } from './pages/services/menu.service';
import { RestaurantService } from './pages/services/restaurant.service';
import { LanguageService } from './pages/services/language.service';
import { MenuServiceMock } from './pages/services/menu.mock';
import { LanguageServiceMock } from './pages/services/language.mock';
import { OrderService } from './pages/services/order.service';

// import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';


// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
  // noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed { //TODO somewhere i have to add the code of services mock backend stuff
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        App, Form, Keyboard, DomController, GestureController, MenuController, AlertController,
        {provide: Platform, useClass: PlatformMock},
        {provide: Config, useClass: ConfigMock},
        {provide: NavController, useClass: NavMock},
        {provide: NavParams, useClass: NavParamMock},
        {provide: MenuService, useClass: MenuServiceMock},
        {provide: LanguageService, useClass: LanguageServiceMock},
         // {
         //   provide: Http,
         //   useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
         //     return new Http(backend, defaultOptions);
         //   },
         //   deps: [MockBackend, BaseRequestOptions]
         // },
        AuthService, ApiEndpointService, AuthHttpService,
        CategoryService, ItemService, RestaurantService, OrderService
      ],
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

}
