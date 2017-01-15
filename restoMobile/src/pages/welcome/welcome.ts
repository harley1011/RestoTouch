import { Component, EventEmitter, Output } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Page2 } from '../page2/page2'

import { Language } from '../shared/models/language';
import { LanguageService } from '../services/language.service';
import { Restaurant } from '../shared/models/restaurant';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	@Output() onSelectLanguage = new EventEmitter<Language>();
  /*Placeholder code*/
	languages: Array<Language> = [];
  supportedLanguages: Array<Language> = [];
	selectedLanguage: Language = new Language('','selectedLanguage','',0);
  lang: Language = new Language('','init','',0);

	selectedRestaurant: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
  			      private languageService: LanguageService,
              private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    this.selectedRestaurant = navParams.get('item');
    this.languages = languageService.languages();
    for (let availLang of this.selectedRestaurant.translations){
      let lang = this.languages.find(language => language.languageCode === availLang.languageCode);
      this.supportedLanguages.push(lang);
    }

    /*this.languageService.getSelectedLanguage().subscribe(
      language => {
        this.lang = language;
        let trans = this.selectedRestaurant.translations.find(translations => translations.languageCode === language.languageCode);
        this.selectedRestaurant.selectedTranslation = trans;
      }
    );*/

  }


  continueTapped(event) {
    // Will push to virtual menu page
    this.navCtrl.push(Page2, {
    });
  }

  selectLanguage() {
    this.languageService.setSelectedLanguage(this.selectedLanguage);
    this.onSelectLanguage.emit(this.selectedLanguage);
    //to set the current language
    this.translate.use(this.selectedLanguage.languageCode);
  }

}