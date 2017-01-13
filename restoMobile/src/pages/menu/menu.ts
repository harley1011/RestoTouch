import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  selectedMenu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedMenu = navParams.get('menu');


  }


}
