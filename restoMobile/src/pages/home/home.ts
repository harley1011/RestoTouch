import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, MenuController } from 'ionic-angular';

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
    this.menuCtrl.toggle('right');
  }

}
