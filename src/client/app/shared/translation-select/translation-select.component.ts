import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Language} from '../../shared/models/language';
import {LanguageService} from '../../services/language.service';

@Component({
  moduleId: module.id,
  selector: 'translation-select-cmp',
  templateUrl: 'translation-select.component.html'
})

export class TranslationSelectComponent implements OnInit {
  @Output() onSelectLanguage = new EventEmitter<Language>();
  selectedLanguage: Language;
  supportedLanguages: Array<Language> = [];
  constructor(private languageService: LanguageService) {
     this.languageService.getSupportedLanguages().subscribe(languages => {
       this.supportedLanguages = languages;
       this.selectedLanguage = this.supportedLanguages[0];
    });
  }

  ngOnInit() {
    console.log('h');

  }

  selectLanguage(language: Language) {
    console.log(language);
    console.log(this.selectedLanguage);
    this.onSelectLanguage.emit(language);
  }

}
