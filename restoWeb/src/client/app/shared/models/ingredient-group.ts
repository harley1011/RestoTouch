import {Ingredient} from './ingredient';

export class IngredientGroup {
    constructor(
                public translations: Array<IngredientGroupTranslations>,
                public selectedTranslation: IngredientGroupTranslations,
                public name: string,
                public ingredients: Array<Ingredient>,
                public maxNumberOfIngredients: number,
                public minNumberOfIngredients: number,
                public orderPriority: number,
                public newIngredient: Ingredient,
                public id?: number) { }
}

export class IngredientGroupTranslations {
  constructor(
    public name: string,
    public languageCode: string) { }
}
