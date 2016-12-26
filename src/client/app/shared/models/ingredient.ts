import {Size} from './size';

export class Ingredient {
    constructor(
                public translations: Array<IngredientGroupTranslations>,
                public selectedTranslation: IngredientGroupTranslations,
                public imageUrl?: string,
                public sizes?: Array<Size>,
                public id?: number) { }
}

export class IngredientGroupTranslations {
	constructor(
				public name: string,
				public description: string,
				public languageCode: string) { }
}
