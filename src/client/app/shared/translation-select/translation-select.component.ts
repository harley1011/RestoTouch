import {Component, OnInit} from '@angular/core';
import {Language} from '../../shared/models/language';
import {LanguageService} from '../../services/language.service';
import { FormsModule } from '@angular/forms';
@Component({
  moduleId: module.id,
  selector: 'translation-select-cmp',
  templateUrl: 'translation-select.component.html'
})

export class TranslationSelectComponent implements OnInit {
  selectedLanguage: string;
  supportedLanguages: Array<Language> = [];
  constructor(private languageService: LanguageService) {
    languageService.getSupportedLanguages().subscribe(supportedLanguages => {
      this.supportedLanguages = supportedLanguages;
    });
  }

  ngOnInit() {
    console.log('temp');
  }

}
