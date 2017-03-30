import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { IngredientGroupPage } from './ingredient-group';

let fixture: ComponentFixture<IngredientGroupPage> = null;
let instance: any = IngredientGroupPage;

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

  it('gets new orderable ingredients and hits limit (disabling)', () => {
    instance.ingredientGroup = {};
    instance.ingredientGroup.ingredients = [];
    instance.selectedIngredients = {};
    instance.selectedIngredients.ingredients = [];
    instance.ingredientCount = 0;
    instance.total = 0;
    instance.ingredientGroup.maxNumberOfIngredients = 2;
    instance.ingredientCount = 0;
    instance.ingredientGroup.ingredients.push(
      {
        name: 'test-ig-1',
        addByDefault: true,
        price: 50.5555
      },
      {
        name: 'test-ig-2',
        addByDefault: true,
        price: 20.5555
      },
      {
        name: 'test-ig-3',
        addByDefault: false,
        price: 75.34444
      }
    );
    spyOn(instance, 'disableIngredients');
    instance.newOrderableIngredients();
    expect(instance.selectedIngredients.ingredients.length).toEqual(2);
    expect(instance.total).toEqual(71.111);
    expect(instance.orderableIngredients.length).toEqual(3);
    expect(instance.disableIngredients).toHaveBeenCalled();
    expect(instance.ingredientCount).toEqual(2);
  });

  it('modifies orderable ingredients', () => {
    instance.ingredientGroup = {};
    instance.ingredientGroup.ingredients = [];
    instance.selectedIngredients = {};
    instance.selectedIngredients.ingredients = [];
    instance.ingredientCount = 0;
    instance.total = 0;
    instance.maxNumberOfIngredients = 2;
    instance.ingredientCount = 0;
    instance.ingredientGroup.ingredients.push(
      {
        name: 'test-ig-1',
        addByDefault: true,
        price: 50.5555
      },
      {
        name: 'test-ig-2',
        addByDefault: true,
        price: 20.5555
      },
      {
        name: 'test-ig-3',
        addByDefault: false,
        price: 75.34444
      }
    );
    instance.modifyOrderableIngredients();
    expect(instance.orderableIngredients.length).toEqual(3);
  });

  it('goes to previous ingredient group', () => {
    spyOn(instance.navCtrl, 'pop');

    instance.ingredientGroupIndex = 1;
    instance.previousIngredientGroup();

    let opts = {
      animate: true,
      animation: 'ios-transition',
      direction: 'back'
    };

    expect(instance.navCtrl.pop).toHaveBeenCalledWith(opts);

    opts.animation  = 'md-transition';
    instance.ingredientGroupIndex = 0;

    instance.previousIngredientGroup();
    expect(instance.navCtrl.pop).toHaveBeenCalledWith(opts);
  });

  it('goes to next ingredient group', () => {
    instance.item = {};
    instance.item.ingredientGroups = ['ingredientGroup1', 'ingredientGroup2'];
    instance.ingredientGroupIndex = 99;
    spyOn(instance, 'doneIngredientOrder');
    spyOn(instance,'nextIngredientOrder');

    instance.nextIngredientGroup();
    expect(instance.doneIngredientOrder).toHaveBeenCalled();

    instance.ingredientGroupIndex = 0;
    instance.nextIngredientGroup();
    expect(instance.nextIngredientOrder).toHaveBeenCalled();
  });

  it('goes to next ingredient order', () => {
    instance.ingredientGroupIndex = 0;
    let navParams: any = {
      item: instance.item,
      ingredientGroupIndex: 1,
      language: instance.selectedLanguage,
      callback: instance.complexOrderCallback,
      ingredients: instance.selectedIngredients,
      modify: instance.modify,
      total: instance.total
    };
    let opts = {
      animate: true,
      animation: 'ios-transition'
    };
    spyOn(instance.navCtrl, 'push');
    instance.nextIngredientOrder();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(IngredientGroupPage, navParams, opts);
  });

  //


  it('adds an ingredient', () => {

    let og = {
      ingredient: {
        price: 10,
        id: 1
      },
      amount: 1,
    };

    let og2 = {
      amount: 1,
      ingredient: {
        price: 10,
        id: 1
      },
    };

    instance.ingredientCount = 0;

    instance.selectedIngredients = {};
    instance.selectedIngredients.ingredients = [{
      ingredient: {
        price: 10,
        id: 1
      }
    }];

    instance.total = 0;

    instance.addIngredient(og);
    expect(instance.total).toEqual(10);
    expect(instance.totalStr).toEqual('10.00');
    expect(instance.ingredientCount).toEqual(1);
    expect(instance.selectedIngredients.ingredients.length).toEqual(1);

    instance.addIngredient(og2);
    expect(instance.total).toEqual(20);
    expect(instance.totalStr).toEqual('20.00');
    expect(instance.ingredientCount).toEqual(2);
    expect(instance.selectedIngredients.ingredients.length).toEqual(1);
  });

  it('removes an ingredient', () => {
    let og = {
      amount: 1,
      ingredient: {
        id: 1,
        price: 10,
      }
    };

    let og2 = {
      amount: 1,
      ingredient: {
        id: 2,
        price: 20
      }
    };

    instance.ingredientCount = 0;

    instance.selectedIngredients = {
      ingredients: [
        {
          ingredient: {
            id: 1,
          },
          amount: 2
        },
        {
          ingredient: {
            id: 2
          },
          amount: 2
        }
      ]
    };

    instance.ingredientCount = 2;
    instance.total = 100;

    instance.removeIngredient(og);
    expect(instance.total).toEqual(90);
    expect(instance.totalStr).toEqual('90.00');
    expect(instance.ingredientCount).toEqual(1);
    expect(instance.selectedIngredients.ingredients.length).toEqual(1);

    instance.addIngredient(og2);
    expect(instance.total).toEqual(110);
    expect(instance.totalStr).toEqual('110.00');
    expect(instance.ingredientCount).toEqual(2);
    expect(instance.selectedIngredients.ingredients.length).toEqual(1);
  });

  it('disables an ingredient', () => {
    instance.orderableIngredients = [
      {
        amount: 2,
        ingredient: {
          id: 2,
          price: 20,
        },
        disabled: false
      },
      {
        amount: 1,
        ingredient: {
          id: 2,
          price: 20,
          allowQuantity: 1,
        },
        disabled: false
      },
    ];

    instance.disableIngredients();
    expect(instance.orderableIngredients[0].disabled).toBeTruthy();
    expect(instance.orderableIngredients[1].disabled).toBeFalsy();
  });

  it('changes an ingredient group', () => {
    instance.currentIngredientGroup = 'test';
    instance.ingredientGroup = 'test';

    spyOn(instance, 'jumpToIngredientGroup');

    instance.changeGroup(1, 'test-group');

    expect(instance.currentIngredientGroup).toEqual('test-group');
    expect(instance.ingredientGroup).toEqual('test-group');
    expect(instance.jumpToIngredientGroup).toHaveBeenCalledWith(1);
  });

  it('jumps to an ingredient group', () => {
    instance.item = {
      ingredientGroups: ['something']
    };
    spyOn(instance, 'doneIngredientOrder');
    spyOn(instance, 'nextIngredientOrder');
    instance.jumpToIngredientGroup(0);
    expect(instance.nextIngredientOrder).toHaveBeenCalled();

    instance.jumpToIngredientGroup(1);
    expect(instance.doneIngredientOrder).toHaveBeenCalled();
  });

});
