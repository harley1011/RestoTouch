import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AccountSettingsService} from './account-settings.service';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {AccountSettings} from '../../shared/models/accountSettings';

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
  hideSuccessMessage: boolean = true;

  constructor(private languageService: LanguageService,
              private translate: TranslateService,
              private accountSettingsService: AccountSettingsService) {
    translate.setDefaultLang('en');
    this.accountSettingsService.getAccountSettings().subscribe(accountSettings => {
      this.accountSettings = accountSettings;
      this.languageService.getSupportedLanguages().subscribe(languages => this.accountSettings.supportedLanguages = languages);
    });
    this.languages = languageService.languages();
  }

  save(): void {
    this.accountSettingsService.updateAccountSettings(this.accountSettings).subscribe(generalResponse => {
      this.languageService.setSupportedLanguages(this.accountSettings.supportedLanguages);
      this.hideSuccessMessage = false;
    });
  }

  addLanguage() {
    this.languageService.addSupportedLanguage(this.languages.find(language => language.languageCode === this.selectedLanguage), false);
  }

  removeLanguage(language: Language) {
    if (this.accountSettings.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    this.accountSettings.supportedLanguages.splice(this.accountSettings.supportedLanguages.indexOf(language), 1);
  }


}
