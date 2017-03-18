
import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { MenuPage } from './menu';



let fixture: ComponentFixture<MenuPage> = null;
let instance: any = null;//MenuPage = null;

describe('Pages: MenuPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([MenuPage]).then(compiled => {
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

  // testing condition branches of method order()
  // pass if condition
  it('should call method "presentPrompt" for "na" notification', () => {
    spyOn(instance, 'presentPrompt');
    spyOn(instance, 'notifyAtEndOrder');
    instance.selectedRestaurant.orderNotiFlag = "na";
    instance.order();
    expect(instance.presentPrompt).toHaveBeenCalled();
    expect(instance.notifyAtEndOrder).not.toHaveBeenCalled();
  });
  // skip if condition to else body
  it('should NOT call method "presentPrompt" for other notifications not "na"', () => {
    spyOn(instance, 'presentPrompt');
    spyOn(instance, 'notifyAtEndOrder');
    spyOn(instance, 'sendOrder');
    instance.selectedRestaurant.orderNotiFlag = "nu";
    instance.order();
    expect(instance.presentPrompt).not.toHaveBeenCalled();
    expect(instance.notifyAtEndOrder).toHaveBeenCalled();
    expect(instance.sendOrder).toHaveBeenCalled();
  });

});


