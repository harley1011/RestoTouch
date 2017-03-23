
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

});


