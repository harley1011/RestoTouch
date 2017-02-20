import { Language } from './language';
import { Item } from './items';
import { Category } from './category';

export class Combo {
  constructor (
    public translations: Array<ComboTranslations>,
    public selectedTranslation: ComboTranslations,
    public categories: Array<Category>,
    public id?: number
  ) { }
}

export class ComboTranslations {
	constructor(
		public name: string,
    public description: string,
		public languageCode: string,
    public discountValue: number,
    public discountFlag: string
		) { }
}
