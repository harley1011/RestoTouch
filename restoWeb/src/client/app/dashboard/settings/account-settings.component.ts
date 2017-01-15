import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AccountSettingsService} from './account-settings.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../../../../../restoCommon/shared/models/language';
import {AccountSettings} from '../../../../../../restoCommon/shared/models/accountSettings';

@Component({
  moduleId: module.id,
  selector: 'account-settings-cmp',
  templateUrl: 'account-settings.component.html',
  providers: [AccountSettingsService]
})

export class AccountSettingsComponent {
  accountSettings: AccountSettings;
  languages: Array<Language>;
  selectedLanguage: string;
  addedSupportedLanguages: Array<Language> = [];
  removedSupportedLanguages: Array<Language> = [];
  hideSuccessMessage: boolean = true;

  constructor(private languageService: LanguageService,
              private translate: TranslateService,
              private accountSettingsService: AccountSettingsService) {
    translate.setDefaultLang('en');
    this.accountSettingsService.getAccountSettings().subscribe(accountSettings => {
      this.accountSettings = accountSettings;
    });
    this.languages = languageService.languages();
  }

  save(): void {
    this.accountSettingsService.updateAccountSettings(this.accountSettings).subscribe(generalResponse => {
      this.hideSuccessMessage = false;
      this.addedSupportedLanguages.forEach(addedLanguage => this.languageService.addSupportedLanguage(addedLanguage, false));
      this.removedSupportedLanguages.forEach(removeLanguage => this.languageService.removeSupportedLanguage(removeLanguage));
    });
  }

  addLanguage() {
    let languageToAdd = this.languages.find(language => language.languageCode === this.selectedLanguage);
    this.accountSettings.supportedLanguages.push(languageToAdd);
    this.addedSupportedLanguages.push(languageToAdd);
    this.accountSettings.supportedLanguages.sort((a: Language, b: Language) => { return a.name <= b.name ? -1 : 1;});
  }

  removeLanguage(language: Language) {
    if (this.accountSettings.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    this.accountSettings.supportedLanguages.splice(this.accountSettings.supportedLanguages.indexOf(language), 1);
    this.removedSupportedLanguages.push(language);
  }


}
