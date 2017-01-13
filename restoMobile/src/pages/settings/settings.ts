import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
 

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
	languages: string[]; //placeholder
	selectedLanguage: string;
	//selectedRestaurant: Restaurant;

  constructor(public navCtrl: NavController) {
    //this.selectedRestaurant = navParams.get('restaurant');
    this.languages = ['en', 'fr', 'es', 'jp']; //placeholder
  }
}
