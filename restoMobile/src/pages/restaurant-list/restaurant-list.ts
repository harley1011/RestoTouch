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
import { AlertController } from 'ionic-angular';
import { OrderService } from '../services/order.service';


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
              public authService: AuthService,
              private alertCtrl: AlertController,
              private orderServices: OrderService) {
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

  itemTapped(event, restaurant): void {
    this.restaurantListService.selectedRestaurant = restaurant;
    // if order notification flag is set to "ta" i.e table number, it will prompt owner to enter table number
    if (this.restaurantListService.selectedRestaurant.orderNotiFlag == 'ta'){
      this.presentPrompt(restaurant);
    } else // if not set to "ta", straight throught
      this.nextToMenu(restaurant);
  }

  nextToMenu(restaurant) {
      this.navCtrl.push(MenuListPage, {
      item: restaurant
    });
  }

  presentPrompt(restaurant) {
    let alert = this.alertCtrl.create({
       title: 'Please enter the table number for this designated device: ',
       inputs: [
         {
          name: 'tableNumber',
          placeholder: 'Table number',
          type: 'string'
         }
        ],
       buttons: [
         {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
             console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            if (data.tableNumber) {
              this.orderServices.notifyOrderDetail = data.tableNumber;
              console.log(this.orderServices.notifyOrderDetail);
              this.nextToMenu(restaurant);
            } else {
              // tableNumber cannot be empty, prompt will not close until valid entry
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
