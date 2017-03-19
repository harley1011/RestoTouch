 import { async, ComponentFixture } from '@angular/core/testing';
 import { TestUtils } from '../../test';
 import { RestaurantListPage } from './restaurant-list';
 import {EventEmitter} from "@angular/core";

 let fixture: ComponentFixture<RestaurantListPage> = null;
 let instance: any = null;//RestaurantListPage = null;

 describe('Pages: RestaurantListPage', () => {

   beforeEach(async(() => TestUtils.beforeEachCompiler([RestaurantListPage]).then(compiled => {
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

  // test condition branches of method itemTapped(...)
  // pass if condition
  it('should call method "presentPrompt for "ta" notification', () => {
    let event = new EventEmitter<{}>();
    instance.restaurantListService.selectedRestaurant = instance;
    instance.restaurantListService.selectedRestaurant.orderNotiFlag = "ta";
    spyOn(instance, 'presentPrompt');
    spyOn(instance, 'nextToMenu');
    instance.itemTapped(event, instance);
    expect(instance.presentPrompt).toHaveBeenCalled();
    expect(instance.nextToMenu).not.toHaveBeenCalled();
  });
  // skip if condition to else body
  it('should NOT call method "presentPrompt for other notifications not "ta"', () => {
    let event = new EventEmitter<{}>();
    instance.restaurantListService.selectedRestaurant = instance;
    instance.restaurantListService.selectedRestaurant.orderNotiFlag = "na";
    spyOn(instance, 'presentPrompt');
    spyOn(instance, 'nextToMenu');
    instance.itemTapped(event, instance);
    expect(instance.presentPrompt).not.toHaveBeenCalled();
    expect(instance.nextToMenu).toHaveBeenCalled();
  });
 });



