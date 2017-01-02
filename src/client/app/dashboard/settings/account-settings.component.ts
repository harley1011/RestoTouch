import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {AccountSettings} from '../../shared/models/accountSettings';

@Component({
  moduleId: module.id,
  selector: 'settings-cmp',
  templateUrl: 'account-settings.component.html'
})

export class SettingsComponent implements OnInit {
  accountSettings: AccountSettings;
  languages: Array<Language>;
  selectedLanguage: string;

  constructor(private languageService: LanguageService,
              private translate: TranslateService,) {
    translate.setDefaultLang('en');
    this.languages = languageService.languages();
    this.accountSettings.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
  }

  ngOnInit(): void {
    console.log('h');
  }

  save(): void {
    console.log('h');
  }

}
