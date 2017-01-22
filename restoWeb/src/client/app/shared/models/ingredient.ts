import {Translation, EntityTranslation} from './translation';

export class Ingredient extends Translation {
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
  constructor(public name: string,
              public languageCode: string) {
    super(languageCode);
  }
}
