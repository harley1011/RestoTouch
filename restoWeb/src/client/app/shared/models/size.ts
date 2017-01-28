import {Translation, EntityTranslation} from './translation';

export class Size extends Translation {

  static fromJson(obj: any): Size {
    let translation = Array<SizeTranslations>();
    obj.translations.forEach((t: SizeTranslations) => {
      translation.push(SizeTranslations.fromJson(t));
    });
    return new Size(translation, null, 0);
  }

  constructor(public translations: Array<SizeTranslations>,
              public selectedTranslation: SizeTranslations,
              public price: number,
              public id?: number) {
    super(translations, selectedTranslation);
  }

  public addAndSelectNewTranslation(languageCode: string) {
    this.addIfNotExistsAndSelect(languageCode, new SizeTranslations('', languageCode));
  }

}


export class SizeTranslations extends EntityTranslation {

  static fromJson(obj: any): SizeTranslations {
    return new SizeTranslations(obj.name, obj.languageCode);
  }

  constructor(public name: string,
              public languageCode: string) {
    super(languageCode);
  }

}
