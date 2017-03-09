import { MyApp } from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';
import {AuthService} from "../pages/services/auth.service";

let instance: MyApp = null;

describe('MyApp', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock), new AuthService(null,null));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises', () => {
    expect(instance).not.toBe(null);
  });
});

