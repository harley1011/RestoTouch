import {Component} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import {Menu} from '../shared/models/menu';
import {Language} from '../shared/models/language';
import {MenuService} from '../services/menu.service';
import {TranslateService} from 'ng2-translate';
import {Restaurant} from '../shared/models/restaurant';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html'
})

export class MenuListPage {
  selectedMenu: any;
  selectedRestaurant: any;
  selectedLanguage: Language = new Language('en', 'selectedLanguage', '', 0);


  numOfMenus: number;
  menus: Menu[];
  restaurant: Restaurant;
  menusInRestaurant: boolean[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuService: MenuService,
              private translate: TranslateService,
              public menuCtrl: MenuController,
              public authService: AuthService) {

    translate.setDefaultLang('en');
    this.selectedRestaurant = navParams.get('item');
  }

  ionViewDidLoad() {
    this.getMenus();
  }

  getMenus(): void {
    this.restaurant = this.selectedRestaurant;
    this.menuService.getMenus().subscribe(
      menus => {
        menus.forEach(menu => menu = this.setTranslationForMenu(menu));
        //menus.forEach(menu => {
        //menu.selectedTranslation = menu.translations.find(translation => translation.languageCode == this.translate.currentLang);
        //});

        this.menus = menus;
        this.numOfMenus = this.menus.length;
        this.menusInRestaurant = new Array(this.menus.length);

        if (this.restaurant === undefined)
          return;

        this.numOfMenus = 0;

        for (var i = 0; i < this.menus.length; i++) {
          this.menusInRestaurant[i] = false;
          for (var j = 0; j < this.restaurant.Menus.length; j++) {
            if (this.menus[i].id === this.restaurant.Menus[j].id) {
              this.menusInRestaurant[i] = true;
              this.numOfMenus++;
              console.log(this.restaurant.Menus[j]);

              break;
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setTranslationForMenu(menu) {
    menu.selectedTranslation = menu.translations.find(translation => translation.languageCode == this.translate.currentLang);
    return menu;
  }

  menuTapped(menu) {
    this.menuService.selectedMenu = menu;
    this.authService.mainNavController.push(WelcomePage, {
      restaurant: this.restaurant
    });
    this.menuCtrl.toggle('right');
  }
}
