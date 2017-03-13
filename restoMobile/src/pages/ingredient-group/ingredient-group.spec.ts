import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { IngredientGroupPage } from './ingredient-group';

let fixture: ComponentFixture<IngredientGroupPage> = null;
let instance: any = null;

describe('Pages: IngredientGroupPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([IngredientGroupPage]).then(compiled => {
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
