import { Language } from './language';
import { Item } from './items';
import { MenuCategory } from './menu-category';

export class Category {
  constructor (
    public translations: Array<CategoryTranslations>,
    public selectedTranslation: CategoryTranslations,
    public items: Array<Item>,
//public comboItems: Array<Item>,
    public MenuCategory?: MenuCategory,
    public id?: number
  ) { }
}

export class CategoryTranslations {
	constructor(
		public name: string,
		public languageCode: string
		) { }
}
