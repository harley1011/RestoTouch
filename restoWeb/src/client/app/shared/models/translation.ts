export abstract class Translation {
  constructor(public translations: Array<EntityTranslation>,
              public selectedTranslation: EntityTranslation) {
  }

  abstract addAndSelectNewTranslation(languageCode: string): void;

  public addIfNotExistsAndSelect(languageCode: string, entityTranslation: EntityTranslation) {
    if (!this.checkAndSelectIfTranslationExists(languageCode)) {
      this.selectedTranslation = entityTranslation;
      this.translations.push(entityTranslation);
    }
  }

  public checkAndSelectIfTranslationExists(languageCode: string) {
    let translation = this.translations.find((translation: EntityTranslation) => translation.languageCode === languageCode);
    if (translation) {
      this.selectedTranslation = translation;
      return true;
    } else {
      return false;
    }
  }

}
export class EntityTranslation {
  constructor(public languageCode: string) {
  }
}
