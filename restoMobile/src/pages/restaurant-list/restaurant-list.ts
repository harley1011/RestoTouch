import { Component, ViewChild } from '@angular/core';
import { App, Nav, NavController, NavParams, MenuController, Platform} from 'ionic-angular';
import { Restaurant } from '../shared/models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import {TranslateService} from 'ng2-translate';
import {TranslationSelectComponent} from '../shared/translation-select/translation-select.component';
import { WelcomePage } from '../welcome/welcome';
import { MenuListPage } from '../menu-list/menu-list';
import { Page2 } from '../page2/page2';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
  queries: {
      nav: new ViewChild('content')
  }
})
export class RestaurantListPage {
//    @ViewChild('content') nav: Nav;

    rootPage: any = WelcomePage;
    @ViewChild(TranslationSelectComponent)
    private translationSelectComponent: TranslationSelectComponent;

    numOfRestaurants: number;
    restaurants: Restaurant[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public app: App,
              private restaurantListService: RestaurantService,
              private translate: TranslateService,
              public menuCtrl: MenuController,
              public authService: AuthService) {
      translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    this.getRestaurants();
  }

    getRestaurants(): void {
        this.restaurantListService.getRestaurants().subscribe(
          restaurants => {
            restaurants.forEach(restaurant => {
            restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === 'en');
            });
            this.restaurants = restaurants;
            this.numOfRestaurants = this.restaurants.length;
          },
          error => {
            console.log(error);
          }
        );
      }

  itemTapped(event, restaurant) {
    this.restaurantListService.selectedRestaurant = restaurant;
    this.navCtrl.push(MenuListPage, {
      item: restaurant
    });
  }
}
