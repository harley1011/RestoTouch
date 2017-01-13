import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Page2 } from '../page2/page2'
 
//Reminder import NavParams, Restaurant, Language

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	languages: string[];
	selectedLanguage: string;
	//selectedRestaurant: Restaurant;

  constructor(public navCtrl: NavController) {
    //this.selectedRestaurant = navParams.get('restaurant');
    this.languages = ['en', 'fr', 'es', 'jp'];
  }

  continueTapped(event) {
    // Will push to virtual menu
    this.navCtrl.push(Page2, {
    });
  }

}