import {Component, OnInit} from '@angular/core';
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

export class AccountSettingsComponent implements OnInit {
  accountSettings: AccountSettings;
  languages: Array<Language>;
  selectedLanguage: string;

  constructor(private languageService: LanguageService,
              private translate: TranslateService,
              private accountSettingsService: AccountSettingsService) {
    translate.setDefaultLang('en');
    this.accountSettingsService.getAccountSettings().subscribe(accountSettings => {
      this.accountSettings = accountSettings;
    });
    this.languages = languageService.languages();
  }

  ngOnInit(): void {
    console.log('h');
  }

  save(): void {
    this.accountSettingsService.updateAccountSettings(this.accountSettings).subscribe(generalResponse => {
      console.log('Success');
    });
  }

  addLanguage() {
    let language = this.accountSettings.supportedLanguages.find(language => language.languageCode === this.selectedLanguage);
    if (language) {
      //todo: remove this once the supported languages are removed from the languages
      console.log('Language is already supported');
      return;
    }
    this.accountSettings.supportedLanguages.push(this.languages.find(language => language.languageCode === this.selectedLanguage));
  }

  removeLanguage(language: Language) {
    if (this.accountSettings.supportedLanguages.length <= 1) {
      //todo: error message
      console.log('At least one supported language is required');
    }
    this.accountSettings.supportedLanguages.splice(this.accountSettings.supportedLanguages.indexOf(language), 1);
  }


}
