import {Ingredient} from './ingredient';
import {Translation, EntityTranslation} from './translation';

export class IngredientGroup extends Translation {

  constructor(public translations: Array<IngredientGroupTranslations>,
              public selectedTranslation: IngredientGroupTranslations,
              public ingredients: Array<Ingredient>,
              public maxNumberOfIngredients: number,
              public minNumberOfIngredients: number,
              public orderPriority: number,
              public newIngredient?: Ingredient,
              public id?: number) {
    super(translations, selectedTranslation);
  }

  addAndSelectNewTranslation(languageCode: string) {
    this.addIfNotExistsAndSelect(languageCode, new IngredientGroupTranslations('', languageCode));

    this.ingredients.forEach(ingredient => {
      ingredient.addAndSelectNewTranslation(languageCode);
    });
    this.newIngredient.addAndSelectNewTranslation(languageCode);
  }

  addNewIngredient(languageCode: string) {
    let ingredient = new Ingredient([], null, false, 0, 1);
    this.translations.forEach(translation => {
      ingredient.addAndSelectNewTranslation(translation.languageCode);
    })
    ingredient.addAndSelectNewTranslation(languageCode);
    this.newIngredient = ingredient;
  }

  static fromJson(obj: any): IngredientGroup {
    let translation = Array<IngredientGroupTranslations>();
    let ingredients = Array<Ingredient>();

    obj.translations.forEach((t: IngredientGroupTranslations) => {
      translation.push(IngredientGroupTranslations.fromJson(t));
    });

    obj.ingredients.forEach((i: Ingredient) => {
      ingredients.push(Ingredient.fromJson(i));
    })

    return new IngredientGroup(translation, null, ingredients, obj.maxNumberOfIngredients, obj.minNumberOfIngredients, obj.orderPriority);
  }
}

export class IngredientGroupTranslations extends EntityTranslation {
  constructor(public name: string,
              public languageCode: string) {
    super(languageCode);
  }

  static fromJson(obj: any): IngredientGroupTranslations {
    return new IngredientGroupTranslations(obj.name, obj.languageCode);
  }
}
