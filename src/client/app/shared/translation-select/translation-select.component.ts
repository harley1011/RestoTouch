import {Component, OnInit} from '@angular/core';
import {Language} from '../../shared/models/language';

@Component({
  moduleId: module.id,
  selector: 'translation-select',
  templateUrl: 'translation-select.component.html'
})

export class TranslationSelectComponent implements OnInit {
  selectedLanguage: string;
  supportedLanguages: Array<Language> = [];
  constructor() {
    console.log('temp');
  }

  ngOnInit() {
    console.log('temp');
  }

}
