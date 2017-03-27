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

  it('initialises orderable ingredients', () => {
    spyOn(instance, 'newOrderableIngredients');
    spyOn(instance, 'modifyOrderableIngredients');

    instance.modify = true;

    instance.initOrderableIngredients();
    expect(instance.modifyOrderableIngredients).toHaveBeenCalled();

    instance.modify = false;
    instance.initOrderableIngredients();
    expect(instance.newOrderableIngredients).toHaveBeenCalled();
  });

  it('gets new orderable ingredients', () => {
    instance.ingredientGroup = {};
    instance.ingredientGroup.ingredients = [];

    instance.selectedIngredients = {};
    instance.selectedIngredients.ingredients = [];

    instance.ingredientCount = 0;
    instance.total = 0;
    instance.maxNumberOfIngredients = 2;

    instance.ingredientGroup.ingredients.push(
      {
        name: 'test-ig-1',
        addByDefault: true,
        price: 50.5555
      },
      {
        name: 'test-ig-2',
        addByDefault: false,
        price: 75.34444
      }
    );
    spyOn(instance, 'disableIngredients');
    instance.newOrderableIngredients();
    expect(instance.selectedIngredients.ingredients.length).toEqual(1);
    expect(instance.total).toEqual(50.5555);
    expect(instance.orderableIngredients.length).toEqual(2);
    expect(instance.disableIngredients).not.toHaveBeenCalled();
    expect(instance.ingredientCount).toEqual(1);
  });

});
