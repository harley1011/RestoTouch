import { Language } from './language';
import { Item } from './items';

export class Combo {
  constructor (
    public translations: Array<ComboTranslations>,
    public selectedTranslation: ComboTranslations,
    public items: Array<Item>,
    public id?: number
  ) { }
}

export class ComboTranslations {
	constructor(
		public name: string,
    public description: string,
		public languageCode: string
		) { }
}
