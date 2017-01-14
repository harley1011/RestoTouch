import { Component, EventEmitter, Output } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Page2 } from '../page2/page2'
 
import { Language } from '../shared/models/language';
import { LanguageService } from '../services/language.service';
//Reminder import NavParams

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	@Output() onSelectLanguage = new EventEmitter<Language>();
  /*Placeholder code*/
	languages: Array<Language> = [];
	selectedLanguage: Language = new Language('','selectedLanguage','',0);
  lang: Language = new Language('','init','',0);
	lang1 = new Language('en', 'English', 'engligh', 0);
  lang2 = new Language('fr', 'French', 'french', 1);

	//selectedRestaurant: Restaurant;

  constructor(public navCtrl: NavController,
  			  private languageService: LanguageService) {
    //this.selectedRestaurant = navParams.get('restaurant')

    /* Placeholder code */
    this.languages.push(this.lang1);
    this.languages.push(this.lang2);
    this.languageService.getSelectedLanguage().subscribe(
      language => {
        this.lang = language;
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