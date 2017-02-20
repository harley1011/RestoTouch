import {Translation, EntityTranslation} from './translation';

export class Ingredient extends Translation {

  static fromJson(obj: any): Ingredient {
    let translation = Array<IngredientTranslations>();
    obj.translations.forEach((t: IngredientTranslations) => {
      translation.push(IngredientTranslations.fromJson(t));
    });
    return new Ingredient(translation, null, obj.addByDefault, obj.price, obj.allowQuantity);
  }

  constructor(public translations: Array<IngredientTranslations>,
              public selectedTranslation: IngredientTranslations,
              public addByDefault: boolean,
              public price: number,
              public allowQuantity: number,
              public imageUrl?: string,
              public id?: number) {
    super(translations, selectedTranslation);
  }

  addAndSelectNewTranslation(languageCode: string): void {
    this.addIfNotExistsAndSelect(languageCode, new IngredientTranslations('', languageCode));
  }

}

export class IngredientTranslations extends EntityTranslation {

  static fromJson(obj: any): IngredientTranslations {
    return new IngredientTranslations(obj.name, obj.languageCode);
  }

  constructor(public name: string,
              public languageCode: string) {
    super(languageCode);
  }
}
