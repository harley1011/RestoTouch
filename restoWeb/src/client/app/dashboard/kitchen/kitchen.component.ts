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
  selectedStationId: number;
  stationList: Array<KitchenStation> = [];
  stationItemResponsability: Array<Item> = [];
  assignedOrder: Order;
  listOfAssignedOrders: Array<Order>;

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
          });
          this.getOrders(this.id);


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
          });
        });
        //B
        orderedItem.sizes.forEach( size => {
          size.size.selectedTranslation = size.size.translations.find(translation => translation.languageCode === language.languageCode);
        });

      });
    });
  }

  getOrders(id: number):void {
          this.orderNotifierService.connectToOrderNotifier(id).subscribe((order: any) => {
            this.order = JSON.parse(order);
            this.order.orderedItems.forEach(orderedItem => {
              orderedItem.item.selectedTranslation = orderedItem.item.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
            });
            this.orders.push(this.order);
          });

           //Get previously cached orders
           this.orderService.retrieveOrders(id).subscribe(orders => {
            this.orders = orders;
            this.listOfAssignedOrders = orders;
           });
  }

  stationSelect(id: number, i: number): void {
    this.selectedStationId = id;
    this.selectedStationInfo = [this.restaurant.kitchenStations[i].name, true];
    this.stationItemResponsability = this.restaurant.kitchenStations[i].kitItem;

    this.listOfAssignedOrders.forEach(order => {
      this.filterToThisStation(order);
      console.log(this.assignedOrder);
      //this.listOfAssignedOrders.push(this.assignedOrder);
    });
  }

  goBack(): void {
    this.getOrders(this.id);
    this.selectedStationInfo[1] = false;
  }

  completeOrder(o: Order): void {

  }

  filterToThisStation(o: Order): void {
    let keepItem: Order = new Order([], null,'','');
    o.orderedItems.forEach(item => {
      this.stationItemResponsability.forEach(stationItem=> {
        if(item.item.id === stationItem.id) {
          keepItem.orderedItems.push(item);
        }
      });
    });
    o.orderedItems = keepItem.orderedItems;
  }
}
