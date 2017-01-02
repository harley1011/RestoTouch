import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';

@Component({
  moduleId: module.id,
  selector: 'settings-cmp',
  templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
  supportedLanguages: Array<Language> = [];
  languages: Array<Language>;
  selectedLanguage: string;

  constructor(private languageService: LanguageService,
              private translate: TranslateService,) {
    translate.setDefaultLang('en');
    this.languages = languageService.languages();
  }


  ngOnInit(): void {
    console.log('h');
  }

  save(): void {
    console.log('h');
  }

}
