import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../../../restoCommon/shared/models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import {TranslateService} from 'ng2-translate';
import {TranslationSelectComponent} from '../shared/translation-select/translation-select.component';

@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html'
})
export class RestaurantListPage {
    numOfRestaurants: number;
    restaurants: Restaurant[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private restaurantListService: RestaurantService,
              private translate: TranslateService) {
  translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
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

}
