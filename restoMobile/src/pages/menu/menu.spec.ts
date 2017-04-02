
import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { MenuPage } from './menu';

let fixture: ComponentFixture<MenuPage> = null;
let instance: any = MenuPage;//MenuPage = null;

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

  // test condition branches of method order()
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

  // test condition branches of method notifyAtEndOrder()
  it('should call "presentAlert" method for "nu" notification', () => {
    spyOn(instance, 'presentAlert');
    instance.selectedRestaurant.orderNotiFlag = "nu";
    instance.notifyAtEndOrder();
    expect(instance.presentAlert).toHaveBeenCalled();
  });
  it('should NOT call presentAlert method for other notifications not "nu"', () => {
    spyOn(instance, 'presentAlert');
    instance.selectedRestaurant.orderNotiFlag = "ta";
    instance.notifyAtEndOrder();
    expect(instance.presentAlert).not.toHaveBeenCalled();
  });

  // test method generateOrderNumber()
  it('should return a number as a string', () => {
    expect(instance.generateOrderNumber()).toEqual(jasmine.any(String));
  });

  it('adds a Simple Order', () => {

    let orderableItemMock = {item: null, sizes: [{size: null, count: 1}]};
    let orderableSizeMock = {size: null, count: 1};

    spyOn(instance.currentOrder,'addOrder');

    instance.addSimpleOrder(orderableItemMock, orderableSizeMock);

    expect(instance.currentOrder.addOrder).toHaveBeenCalledWith(orderableItemMock.item, orderableSizeMock.size, null, 0);
    expect(orderableSizeMock.count).toEqual(2);

  });

  it('removes an order', () => {
    let orderableCategoryMock = null;
    let orderableItemMock = {item: null, sizes: [{size: null, count: 1}]};
    let orderableSizeMock = {size: null, count: 1};

    spyOn(instance.currentOrder,'removeOrder');

    instance.removeOrder(orderableCategoryMock, orderableItemMock, orderableSizeMock);

    expect(instance.currentOrder.removeOrder).toHaveBeenCalledWith(orderableItemMock.item, orderableSizeMock.size, null);
    expect(orderableSizeMock.count).toEqual(0);
  });

  //line 60
  it('should distinguish the correct item to be disabled', () => {

    instance.menu = {};
    instance.menu.disabledCategoryItems = [{itemId:1 , categoryId: 1, id: 1}];
    let targetItem = {id:1};
    let category = {id:1};

    expect(instance.isItemDisabled(targetItem, category)).toBeTruthy();

    instance.menu.disabledCategoryItems = [{itemId:1 , categoryId: 2, id: 1}];
    expect(instance.isItemDisabled(targetItem, category)).toBeFalsy();
  });
/*
  //line 69
  it('should get a menu', () => {


  });

  //line 105
  it('', () => {

  });

  //line 125
  it('', () => {

  });

  //line 145
  it('', () => {

  });

  //line 157
  it('', () => {

  });

  //line 172
  it('', () => {

  });

  //line 197
  it('', () => {

  });

  //line 218
  it('', () => {

  });

  //line 229
  it('', () => {

  });

  //line 268
  it('', () => {

  });

  //line 279
  it('', () => {

  });

  //line 306
  it('', () => {

  });

  //line 351
  it('', () => {

  });
*/
});
