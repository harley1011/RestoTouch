import {Ingredient} from './ingredient';

export class IngredientGroup {
    constructor(
                public ingredients: Array<Ingredient>,
                public translations: Array<IngredientGroupTranslations>,
                public selectedTranslation: IngredientGroupTranslations,
                public numberOfIngredientsAllowed: number,
                public defaultIngredient: Ingredient,
                public imageUrl?: string,
                public id?: number) { }
}

export class IngredientGroupTranslations {
	constructor(
				public name: string,
				public description: string,
				public languageCode: string) { }
}
