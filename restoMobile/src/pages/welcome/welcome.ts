import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//Reminder import NavParams

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	language: string = "Hello";

  constructor(public navCtrl: NavController) {
    
  }

}