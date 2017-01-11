import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-menu-list',
    templateUrl: 'menu-list.html'
})

export class MenuListPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
