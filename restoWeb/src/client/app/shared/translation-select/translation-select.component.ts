import {Component, EventEmitter, Output} from '@angular/core';
import {Language} from '../models/language';
import {LanguageService} from '../../services/language.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  moduleId: module.id,
  selector: 'translation-select-cmp',
  templateUrl: 'translation-select.component.html'
})

export class TranslationSelectComponent {
  @Output() onSelectLanguage = new EventEmitter<Language>();
  selectedLanguage: Language;
  supportedLanguages: Array<Language> = [];
  addNewLanguage = new Language('add', 'Add New Language', 'Add New Language', 1);

  constructor(private languageService: LanguageService) {
     this.languageService.getSupportedLanguages().subscribe(languages => {
       this.supportedLanguages = languages;
    });

     this.languageService.getSelectedLanguage().subscribe(language => {
       this.selectedLanguage = language;
     });
  }

  getSelectedLanguage(): ReplaySubject<Language> {
    return this.languageService.getSelectedLanguage();
  }

  selectLanguage(language: Language) {
    if (language == this.addNewLanguage) {
      this.languageService.openModalPicker();
    } else {
      this.selectedLanguage = language;
      this.languageService.setSelectedLanguage(this.selectedLanguage);
      this.onSelectLanguage.emit(this.selectedLanguage);
    }
  }



}
