import { Language } from './language';
import {Category} from './category';

export class Menu {
  //id: number;
  constructor (
    public translations: Array<MenuTranslations>,
    public selectedTranslation: MenuTranslations,
    public categories: Array<Category>, // This menu will contain the list of selected categories.
    public id?: number
	) { }
}

export class MenuTranslations {

	constructor(public name: string,
				public languageCode: string) { }
}
