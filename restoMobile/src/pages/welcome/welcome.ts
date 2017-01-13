import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Page2 } from '../page2/page2'
 
import { Language } from '../shared/models/language';
//Reminder import NavParams, Restaurant, Language

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	languages: Array<Language> = [];
	selectedLanguage: string;
	lang1 = new Language('en', 'English', 'engligh', 0);
    lang2 = new Language('fr', 'French', 'french', 1);
	//selectedRestaurant: Restaurant;

  constructor(public navCtrl: NavController) {
    //this.selectedRestaurant = navParams.get('restaurant')
    this.languages.push(this.lang1);
    this.languages.push(this.lang2);
  }

  continueTapped(event) {
    // Will push to virtual menu page
    this.navCtrl.push(Page2, {
    });
  }
  //Selected Languages pushed as a parameter or set globally in another component/service?

}