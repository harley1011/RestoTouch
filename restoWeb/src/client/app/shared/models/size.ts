import {Translation, EntityTranslation} from './translation';

export class Size extends Translation  {
  constructor (
    public translations: Array<SizeTranslations>,
    public selectedTranslation: SizeTranslations,
    public price: number
	) { super(translations, selectedTranslation);}

  public addAndSelectNewTranslation(languageCode: string) {
    this.addIfNotExistsAndSelect(languageCode, new SizeTranslations('', languageCode));
  }
}


export class SizeTranslations extends EntityTranslation {
  constructor(public name: string,
              public languageCode: string) {super(languageCode); }
}
