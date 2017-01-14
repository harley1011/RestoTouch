import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Language } from '../shared/models/language';
import { LanguageService } from '../services/language.service';
 

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
	languages: string[]; //placeholder
	selectedLanguage: string;
	lang: Language = new Language('', 'test','',0); //Placeholder

	//selectedRestaurant: Restaurant;

  constructor(public navCtrl: NavController, public langService: LanguageService) {
    //this.selectedRestaurant = navParams.get('restaurant');
    this.languages = ['en', 'fr', 'es', 'jp']; //Placeholder
    
    this.langService.getSelectedLanguage().subscribe(
      language => {
        this.lang = language;
    });
  }
}
