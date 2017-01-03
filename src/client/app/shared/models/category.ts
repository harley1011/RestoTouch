import { Language } from './language';

export class Category {
  constructor (
    public translations: Array<CategoryTranslations>,
    public selectedTranslation: CategoryTranslations,
    public id?: number
  ) { }
}

export class CategoryTranslations {
	constructor(
		public name: string,
		public languageCode: string
		) { }
}
