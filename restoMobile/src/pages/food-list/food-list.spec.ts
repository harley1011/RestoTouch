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

  //line 32
  it('', () => {

  });

  //line 55
  it('', () => {

  });

  //line 66
  it('', () => {

  });

  //line 74
  it('', () => {

  });

  //line 89
  it('', () => {

  });

  //line 100
  it('', () => {

  });

  //line 112
  it('', () => {

  });
});
