import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Language} from '../../shared/models/language';
import {LanguageService} from '../../services/language.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
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
    });

     this.languageService.getSelectedLanguage().subscribe(language => {
       this.selectedLanguage = language;
     });
  }

  ngOnInit() {
    console.log('h');
  }

  getSelectedLanguage(): ReplaySubject<Language> {
    return this.languageService.getSelectedLanguage();
  }

  selectLanguage() {
    this.onSelectLanguage.emit(this.selectedLanguage);
  }

}
