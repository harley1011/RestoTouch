import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { FoodListPage } from './food-list';

let fixture: ComponentFixture<FoodListPage> = null;
let instance: any = null;

describe('Pages: FoodListPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([FoodListPage]).then(compiled => {
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

});
