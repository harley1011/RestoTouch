import {Size} from './size';
import {Language} from './language';
import {IngredientGroup} from './ingredient-group';

export class Item {
    constructor(
                public supportedLanguages: Array<Language>,
                public translations: Array<ItemTranslations>,
                public selectedTranslation: ItemTranslations,
                public ingredientGroups?: Array<IngredientGroup>,
                public imageUrl?: string,
                public sizes?: Array<Size>,
                public id?: number,
                ) { }
}

export class ItemTranslations {
	constructor(
				public name: string,
				public description: string,
				public languageCode: string) { }
}
