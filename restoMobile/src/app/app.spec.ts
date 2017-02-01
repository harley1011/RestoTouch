import { MyApp } from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';

let instance: MyApp = null;

describe('MyApp', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock), (<any> new MenuMock));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises', () => {
    expect(instance).not.toBe(null);
  });
});
