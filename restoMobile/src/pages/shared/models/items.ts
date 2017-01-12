import {Size} from './size';
import {Language} from './language';
import {IngredientGroup} from './ingredient-group';
import {Category} from './category';

export class Item {
    constructor(
                public translations: Array<ItemTranslations>,
                public selectedTranslation: ItemTranslations,
                public categories: Array<Category>,
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
