import { Language } from '../shared/models/language';
import {EventEmitter} from "@angular/core";

export class LanguageServiceMock {

  languages(): Array<any> {
    return [];
  }

  //fixed the initialisation error for settings.spec.ts
  getSelectedLanguage (): EventEmitter<Language> {
    let em = new EventEmitter();
    setTimeout(em.emit(new Language('', 'test', '', 0)), 100);
    return (<any>em);
  }
}
