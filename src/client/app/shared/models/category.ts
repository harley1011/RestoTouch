import { Language } from './language';

export class Category {
  constructor (
    public categoryName: string,
    public supportedLanguages: Array<Language>,
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
