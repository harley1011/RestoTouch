import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from 'ng2-translate';
import { OrderService } from '../../services/order.service';
import { OrderNotifierService } from '../../services/order-notifier.service';
import { Order } from '../../shared/models/order';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../shared/models/restaurant';
import { TranslationSelectComponent } from '../../shared/translation-select/translation-select.component';
import { Language } from './../../shared/models/language';
import { KitchenStation } from '../../shared/models/kitchen-station';
import { Item } from '../../shared/models/items';

@Component({
  moduleId: module.id,
  selector: 'kitchen-cmp',
  templateUrl: 'kitchen.component.html',
  providers: [OrderService, OrderNotifierService]
})

export class KitchenComponent implements OnInit {

  orders: Array<Order> = [];
  order: Order;
  id: number;
  restoMode: string;
  restaurant: Restaurant;
  selectedStationInfo: [string, boolean] = ['', false];
  stationList: Array<KitchenStation> = [];
  stationItemResponsability: Array<Item> = [];
  orderResponsibilityToSelectedStation: Order;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;

	constructor(private orderService: OrderService,
              private orderNotifierService: OrderNotifierService,
              private restaurantService: RestaurantService,
				      private route: ActivatedRoute,
				      private translate: TranslateService) {

	}

	ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.restaurantService.getRestaurant(this.id).subscribe( restaurant => {
            console.warn(restaurant);
            this.restoMode = restaurant.kitCashModeFlag;
            this.restaurant = restaurant;
            this.stationList = restaurant.kitchenStations;
          })
          this.orderNotifierService.connectToOrderNotifier(this.id).subscribe((order: any) => {
            this.order = JSON.parse(order);
            console.log(this.order);
            this.order.orderedItems.forEach(orderedItem => {
              orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
            });
            this.orders.push(this.order);
          });


           //Get previously cached orders
           this.orderService.retrieveOrders(this.id).subscribe(orders => {
           this.orders = orders;
           console.warn(this.orders);

           });

        }
    });
  }

  onSelectLanguage(language: Language) {
    //A
    this.orders.forEach(order => {
      //B
      order.orderedItems.forEach(orderedItem => {
        orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === language.languageCode);
        //C
        orderedItem.item.ingredientGroups.forEach(ingredientGroup => {
          //1
          ingredientGroup.selectedTranslation = ingredientGroup.translations.find(translation => translation.languageCode === language.languageCode);
          //2
          ingredientGroup.ingredients.forEach(ingredient => {
            ingredient.selectedTranslation = ingredient.translations.find(translation => translation.languageCode === language.languageCode);
          })
        })
        //B
        orderedItem.sizes.forEach( size => {
          size.size.selectedTranslation = size.size.translations.find(translation => translation.languageCode === language.languageCode);
        })

      });
    });
  }

  stationSelect(id: string, i: number): void {
    this.selectedStationInfo = [id, true];
    this.stationItemResponsability = this.restaurant.kitchenStations[i].kitItem;
  }

  goBack(): void {
    this.selectedStationInfo[1] = false;
  }

}
