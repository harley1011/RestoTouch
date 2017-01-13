import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
    selector: 'page-menu-list',
    templateUrl: 'menu-list.html'
})

export class MenuListPage {
    selectedMenu: any;
    menus: Array<{title: string}>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.selectedMenu = navParams.get('menu');
        //TODO to refactor
        this.menus = [];
        for(let i = 0; i < 5; i++) {
            this.menus.push({
                title: 'Menutest ' + i
            });
        }
    }

    menuTapped(menu){
        this.navCtrl.push(MenuPage, {
            menu: menu
        });
    }
}
