import {Ingredient} from './ingredient';
import {Translation, EntityTranslation} from './translation';

export class IngredientGroup extends Translation {

  constructor(public translations: Array<IngredientGroupTranslations>,
              public selectedTranslation: IngredientGroupTranslations,
              public name: string,
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
}

export class IngredientGroupTranslations extends EntityTranslation {
  constructor(public name: string,
              public languageCode: string) {
    super(languageCode);
  }
}
