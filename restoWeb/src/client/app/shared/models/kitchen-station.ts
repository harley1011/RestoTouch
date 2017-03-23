import { Language } from './language';
import { Category } from './category';

export class KitchenStation {
  constructor (
    public translations: Array<KitchenTranslations>,
    public selectedTranslation: KitchenTranslations,
    public kitCat: Array<Category>,
    public id?: number
  ) { }
}

export class KitchenTranslations {
	constructor(
		public name: string,
	) { }
}
