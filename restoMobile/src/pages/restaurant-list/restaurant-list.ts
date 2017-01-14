import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../shared/models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import {TranslateService} from 'ng2-translate';
import {TranslationSelectComponent} from '../shared/translation-select/translation-select.component';


/*
  Generated class for the RestaurantList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html'
})
export class RestaurantListPage {
    numOfRestaurants: number;
    restaurants: Restaurant[];

@ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private restaurantListService: RestaurantService,
              private translate: TranslateService) {
  translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
    this.getRestaurants();
//    console.log(this.restaurants);
//    console.log('num: ' + this.restaurants.length);
    
  }

    getRestaurants(): void {
        this.restaurantListService.getRestaurants().subscribe(
          restaurants => {
            restaurants.forEach(restaurant => {
//              restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
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
