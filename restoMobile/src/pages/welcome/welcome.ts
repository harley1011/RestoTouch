import { Component, EventEmitter, Output } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Page2 } from '../page2/page2'
 
import { Language } from '../shared/models/language';
import { LanguageService } from '../services/language.service';
import { Restaurant } from '../shared/models/restaurant';

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
  			      private languageService: LanguageService) {
    this.selectedRestaurant = navParams.get('item');
    console.log(this.selectedRestaurant);

    /* Could be improved */
    this.languages = languageService.languages();
    for(let translation of this.selectedRestaurant.translations) {
      let lang = this.languages.find(language => language.languageCode === translation.languageCode);
      this.supportedLanguages.push(lang);
    }

    this.languageService.getSelectedLanguage().subscribe(
      language => {
        this.lang = language;
        let trans = this.selectedRestaurant.translations.find(translation => translation.languageCode === language.languageCode);
        this.selectedRestaurant.selectedTranslation = trans;
    });
  }

  continueTapped(event) {
    // Will push to virtual menu page
    this.navCtrl.push(Page2, {
    });
  }

  selectLanguage() {
    this.languageService.setSelectedLanguage(this.selectedLanguage);
    this.onSelectLanguage.emit(this.selectedLanguage);
  }

}