import { Language } from './language';
import { Item } from './items';

export class Category {
  constructor (
    public translations: Array<CategoryTranslations>,
    public selectedTranslation: CategoryTranslations,
    public items: Array<Item>,
    public id?: number
  ) { }
}

export class CategoryTranslations {
	constructor(
		public name: string,
		public languageCode: string
		) { }
}
