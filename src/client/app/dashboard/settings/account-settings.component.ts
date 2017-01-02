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

      if (this.accountSettings.supportedLanguages.length === 0) {
        this.accountSettings.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
      }
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

}
