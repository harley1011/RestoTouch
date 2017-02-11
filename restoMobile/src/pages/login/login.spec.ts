import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoginPage } from './login';

import { RestaurantListPage } from '../restaurant-list/restaurant-list';
import {EventEmitter} from "@angular/core";


let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;//LoginPage = null;

describe('Pages: LoginPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.autoDetectChanges(true);
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(fixture).not.toBeNull();
    expect(instance).not.toBeNull();
  });


  it('submits', (done) => { //testing login - asynchronous code


    //Setting up an event emitter to be the fake event that you get back from the authService.
    let event = new EventEmitter<{}>();
    //mocking  one function of all authUser service which is authenticate user.
    let authUserMock = ((user) => {
      return event;
    });

    // this function is subscribed to the event emitter - so should be called when we invoke onSubmit
    // if not - Karma will timeout and we wont get a test pass
    let doneFn = (() => {
      // the auth service should be called with our current user
      expect(instance.authService.authenticateUser).toHaveBeenCalledWith(instance.user);
      // and our navCtrl should be called with the restaraunt list page (to switch pages)
      expect(instance.navCtrl.push).toHaveBeenCalledWith(RestaurantListPage);
      // finally call the done function, which will end our async test otherwise the test will timeout
      done();
    });

    // replace authenticateUser with the mock above
    spyOn(instance.authService, 'authenticateUser').and.callFake(authUserMock);



    //console.log(instance.navCtrl);
    spyOn(instance.navCtrl, 'push');

    // invoke the onSubmit function; it will subscribe itself to our authUserMock which will expect our event emitter to emit something
    instance.onSubmit();

    // subscribe our doneFn to the event emitter because i need to know in the asynchronous code when the event has been received
    event.subscribe(doneFn);

    // finally, emit from the event emitter, which will trigger the latter part of onSubmit
    event.emit();
  });

  it('initialises with the correct languages', () => {
    expect(instance.translate.getDefaultLang()).toEqual('en');
    expect(instance.translate.currentLang).toEqual('en');
  });

});
