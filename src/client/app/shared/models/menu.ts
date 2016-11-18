import { Language } from './language';

export class Menu {
  id: number;
  constructor (
    public name: string,
    public supportedLanguages: Array<Language>,
    public translations: Array<MenuTranslations>,
    public selectedTranslation: MenuTranslations
	) { }
}

export class MenuTranslations {

	constructor(public name: string,
				public languageCode: string) { }
}
