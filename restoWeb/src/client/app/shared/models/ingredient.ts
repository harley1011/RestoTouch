
export class Ingredient {
  constructor(
              public translations: Array<IngredientTranslations>,
              public selectedTranslation: IngredientTranslations,
              public addByDefault: boolean,
              public price: number,
              public allowQuantity: number,
              public imageUrl?: string,
              public id?: number) {
  }
}

export class IngredientTranslations {
  constructor(
    public name: string,
    public languageCode: string) { }
}
