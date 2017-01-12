import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../shared/models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private restaurantListService: RestaurantService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
    this.getRestaurants();
    console.log(this.restaurants);
    console.log('num: ' + this.restaurants.length);
    
  }

getRestaurants(): void {
    this.restaurantListService.getRestaurants().subscribe(
      restaurants => {
//        restaurants.forEach(restaurant => {
//          restaurant.selectedTranslation = restaurant.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
//        });
        this.restaurants = restaurants;
        this.numOfRestaurants = this.restaurants.length;
      },
      error => {
        console.log(error);
      }
    );
  }

}
