import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html'
})

export class MenuListPage {
  selectedMenu: any;
  selectedRestaurant: any;
  selectedLanguage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedRestaurant = navParams.get('restaurant');
    this.selectedMenu = navParams.get('menu');
    this.selectedLanguage = navParams.get('language');
    /*
     this.selectedRestaurant.Menus.forEach( menu => {
        menu.selectedTranslation = menu.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
     })
    */
    this.selectedRestaurant.Menus.map(this.setTranslationForMenu);
  }

  setTranslationForMenu(menu) {
    menu.selectedTranslation = menu.translations.find(translation => translation.languageCode == this.selectedLanguage.languageCode);
    return menu;
  }

  menuTapped(menu){
    this.navCtrl.push(MenuPage, {
      menu: menu,
      language: this.selectedLanguage
    });
  }
}

