export class Category {
  constructor (
    public categoryName: string,
    public translations: Array<CategoryTranslations>,
    public selectedTranslation: CategoryTranslations
  ) { }
}

export class CategoryTranslations {

	constructor(public name: string,
				public languageCode: string) {
	}
}

