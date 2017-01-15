import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { MenuService } from '../services/menu.service';
import { Menu } from '../../pages/shared/models/menu';

@Component({
    selector: 'page-menu-list',
    templateUrl: 'menu-list.html'
})

export class MenuListPage {
    selectedMenu: any;
    menus: Array<Menu>;
    selectedRestaurant: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService) {

        this.selectedRestaurant = navParams.get('restaurant');
        this.selectedMenu = navParams.get('menu');
        this.getMenus();

    }

    getMenus(): void {
        this.menuService.getMenus().subscribe(
            menus => {
                this.menus = menus;
                menus.forEach(menu => {
                    menu.selectedTranslation = menu.translations.find(translation => translation.languageCode == 'en');
                });
            },
            error => {
                console.log(error);
            }
        );
    };

    menuTapped(menu){
        this.navCtrl.push(MenuPage, {
            menu: menu
        });
    }
}
