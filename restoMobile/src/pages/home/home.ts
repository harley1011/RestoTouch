import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
//    this.nav.setRoot(LoginPage);
    this.menuCtrl.toggle('left');
//    this.menuCtrl.enable(true, 'clientMenu');
  }

}
